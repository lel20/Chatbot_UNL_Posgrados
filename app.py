import os
from flask import Flask, jsonify, render_template
from flask import request
from chat import get_response
import requests
import json
import re
import spacy
from spacy.lang.es.stop_words import STOP_WORDS
nlp = spacy.load("es_core_news_sm")
app = Flask(__name__ )
@app.get("/")
def index():
    return render_template("index.html")
@app.post("/predict")
def predict():
    url1 = 'https://raw.githubusercontent.com/Leo646/Practicas-Simulacion/master/preguntas2'
    resp = requests.get(url1)
    datos = json.loads(resp.text)
    while True:    
        text1= request.get_json().get("message").lower()
        text=text1.strip()
        #Para que el chat salude en caso de que el usuario lo haga
        text= re.sub("\,|\?|\¿","",text)
        mayor=0.7
        dato=''
        indice=0
        texto=nlp(text)
        for token in texto:
            if token.is_stop==False:
                dato=dato+token.text+" " 
        patron='^[-]{0,1}[0-9]+$'
        a=bool(re.search(patron,dato.strip()))
        numero=0
        if(a==True):
            numero=int(dato)
        if(numero>25):
            indice=100
            print(numero)
        else:
            for i,data in enumerate(datos['data']): 
                for e,pregunta in enumerate(data['questions']):
                    pre=nlp(dato)
                    pre1=nlp(pregunta) 
                    if pre.similarity(pre1)>mayor:
                        indice=i
                        mayor=pre.similarity(pre1)
        if mayor <= 0.7:
            indice=100            
        print(indice)   
        print(mayor)
        print(dato)  
        if(indice==0):
            message={"number":indice,"answer":0}
            
        elif(indice==1):
            respose=get_response('¿que requisitos se necesitan para la inscripción?')
            message={"number":indice,"answer":respose}
        elif(indice==2):
            respose=get_response('¿dónde puedo registrar la matrícula de un posgrado?')
            message={"number":indice,"answer":respose}
        elif(indice==3):
            respose=get_response('¿tipos de posgrados?')
            message={"number":indice,"answer":respose}
        elif(indice==4 ):
            respose=get_response('¿cuál es el listado de los posgrados de la UNL?')
            message={"number":indice,"answer":respose}
        elif(indice==5 ):
            respose=get_response('¿qué maestrías ofrece la carrera de computación?')
            message={"number":indice,"answer":respose}
        elif(indice==6):
            respose=get_response('¿qué formas de pago existen?')
            message={"number":indice,"answer":respose}
        elif(indice==7):
            respose=get_response('¿cuál es la duración de los posgrados?')
            message={"number":indice,"answer":respose}
        elif(indice==8):
            respose=get_response('¿qué modalidades de estudio existen?')
            message={"number":indice,"answer":respose}
        elif(indice==9):
            respose=get_response('¿cuáles son las fechas establecidas para matricularse en una maestría?')
            message={"number":indice,"answer":respose}
        elif(indice==10):
            respose=get_response('¿cuáles son los requisitos para homologar?')
            message={"number":indice,"answer":respose}
        elif(indice==11):
            respose=get_response('¿cuáles son los requisitos para la inscripción de la maestría de ingeniera de software?')
            message={"number":indice,"answer":respose}
        elif(indice==12):
            respose=get_response('¿cuáles son los requisitos para la matrícula?')
            message={"number":indice,"answer":respose}
        elif(indice==13):
            respose=get_response('¿cuál es el coste de los posgrados?')
            message={"number":indice,"answer":respose}
        elif(indice==14):
            respose=get_response('¿cuál es el coste de la maestría de ingeniería en software?')
            message={"number":indice,"answer":respose}
        elif(indice==15):
            respose=get_response('¿qué tiempo dura la maestría de ingenieria en software?')
            message={"number":indice,"answer":respose}
        elif(indice==16):
            respose=get_response('¿qué es la modalidad presencial?')
            message={"number":indice,"answer":respose}
        elif(indice==17):
            respose=get_response('¿modalidad semipresencial?')
            message={"number":indice,"answer":respose}
        elif(indice==18):
            respose=get_response('¿qué es la modalida en línea?')
            message={"number":indice,"answer":respose}
        elif(indice==19):
            respose=get_response('¿qué es la modalidad a distancia?')
            message={"number":indice,"answer":respose}
        elif(indice==20):
            respose=get_response('¿qué es la modalidad dual?')
            message={"number":indice,"answer":respose}
        elif(indice==21):
            respose=get_response('¿qué es la modalidad híbrida?')
            message={"number":indice,"answer":respose}
        elif(indice==22):
            respose=get_response('¿qué mecanismos de homologación existen?')
            message={"number":indice,"answer":respose}
        elif(indice==23):
            respose=get_response('¿cuáles son los horarios establecidos para las maestrías?')
            message={"number":indice,"answer":respose}
        elif(indice==24):
            respose=get_response('¿cuáles son los horarios establecidos para la maestría de ingeniería en software?')
            message={"number":indice,"answer":respose}
        elif(indice==25):
            respose=get_response('¿dónde puedo realizar el pago?')
            message={"number":indice,"answer":respose}
        elif(indice==26):
            message={"number":indice}
        elif(indice==27):
            message={"number":indice}
        elif(indice==28):
            message={"number":indice}
        elif(indice==29):
            message={"number":indice}
        elif(indice==30):
            message={"number":indice}
        elif(indice==31):
            message={"number":indice}
        elif(indice==32):
            message={"number":indice}
        elif(indice==33):
            message={"number":indice}
        elif(indice==34):
            message={"number":indice}
        else:
            message={"number":100,"answer":"HOLA"}
        
        return jsonify(message)
#dirección donde se ejecuta la aplicación        
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 80))
    app.run(host='0.0.0.0', port=port)
