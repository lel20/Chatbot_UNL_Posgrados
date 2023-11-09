#librerías 
from transformers import BertForQuestionAnswering, BertTokenizerFast 
import torch
import requests
import json
import re
from flask import request
# Importar el modelo
modelo= 'leo123/DistilBERT-Preguntas-Respuestas-Posgrados'
#se carga el modelo entrenado para la predicción
model_preentrenado = BertForQuestionAnswering.from_pretrained(modelo)
#transforma las entradas en tokens numéricos
tokenizador = BertTokenizerFast.from_pretrained(modelo)
#establece si se tRabaja con CPU o GPU
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model_preentrenado = model_preentrenado.to(device)
def get_prediction(contexto, pregunta):
  #se toqueniza las preguntas y el contexto
  entradas = tokenizador.encode_plus(pregunta, contexto, return_tensors='pt').to(device)
  salida = model_preentrenado(**entradas)
  #se calcula el inicio y final de la respuesta  que el modelo predice
  inicio_respuesta = torch.argmax(salida[0])  
  final_respuesta = torch.argmax(salida[1]) + 1 
  #almacena el inicio-final de la respueta que el modelo predice 
  respuesta = tokenizador.convert_tokens_to_string(tokenizador.convert_ids_to_tokens(entradas['input_ids'][0][inicio_respuesta:final_respuesta]))
  return respuesta
def normalize_text(s):
  import string, re
 
  def white_space_fix(text):
    return " ".join(text.split())
  def remove_punc(text):
    exclude = set(string.punctuation)
    return "".join(ch for ch in text if ch not in exclude)
  def lower(text):
    return text.lower()

  return white_space_fix(remove_punc(lower(s)))

def exact_match(prediction, truth):
    return bool(normalize_text(prediction) == normalize_text(truth))

def compute_f1(prediction, truth):
  pred_tokens = normalize_text(prediction).split()
  truth_tokens = normalize_text(truth).split()
  
  
  if len(pred_tokens) == 0 or len(truth_tokens) == 0:
    return int(pred_tokens == truth_tokens)
  
  common_tokens = set(pred_tokens) & set(truth_tokens)
  
  if len(common_tokens) == 0:
    return 0
  
  prec = len(common_tokens) / len(pred_tokens)
  rec = len(common_tokens) / len(truth_tokens)
  
  return round(2 * (prec * rec) / (prec + rec), 2)
  
def get_response(pregunta):
  pregunta=pregunta.lower()#descompone la pregunta en palabras
  palabra=pregunta
  palabra= re.sub("\,|\?|\¿","",palabra)
  url3 = 'https://raw.githubusercontent.com/Leo646/TrabajoTitulacion/main/Base_Conocimientos/Base_Conocimientos2'
  resp = requests.get(url3)
  datos = json.loads(resp.text)
  frase=[]
  link1=[]
  for i,data in enumerate(datos['data']): 
     for a,clave in enumerate(data['palabras_clave']):
        if clave == palabra:
          for c, parrafo in enumerate(data['parrafo']): 
             frase=parrafo['context']
             link1=parrafo['enlace1'] 
  if len(link1)!=0:
    prediction = get_prediction(frase,palabra)   
    return prediction + " "+ link1
  else:
    # s="_Para más información revise el "
    prediction = get_prediction(frase,pregunta)
    return prediction
  

