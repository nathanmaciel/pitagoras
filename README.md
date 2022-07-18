# Pitágoras

Esta simples aplicação é um teste de integração entre uma API construída com Django e um site construído com React. O objetivo é calcular o terceiro lado de um triângulo retângulo.

O site em React cuida dos inputs e de desenhar, usando apenas CSS, um triângulo na proporção do calculado.

A API, ao receber via requisição HTTP um objeto contendo dois dos lados do triângulo retângulo, calcula o terceiro lado e retorna via resposta JSON um objeto contendo os três lados do triângulo calculados.

Abaixo, uma demonstração de como o site funciona e você pode acessar o deploy neste link: https://pitagoras-nathanlmsilva-gmailcom.vercel.app/ .

Para usar a API, é necessário enviar uma requisição POST para o endpoint: https://pitag-server.herokuapp.com/calc/pitagoras , contendo um objeto com as seguintes chaves: "cat1", "cat2" e "hip", representando os dois catetos e a hipotenusa do triângulo. Sendo que duas delas devem conter valores numéricos e uma deve estar vazia, recebendo portanto uma string vazia. A API retorna um objeto, com as mesmas chaves, contendo além dos dois valores de entrada, o terceiro valor calculado.

<img src="https://raw.githubusercontent.com/nathanmaciel/pitagoras/main/Loom%20Message%20-%2018%20July%202022.gif" width="800" height="450" />

