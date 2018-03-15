	
function jsonPost(url, data)
    {
        return new Promise((resolve, reject) => {
            var x = new XMLHttpRequest();   
            x.onerror = () => reject(new Error('jsonPost failed'))
            //x.setRequestHeader('Content-Type', 'application/json');
            x.open("POST", url, true);
            x.send(JSON.stringify(data))

            x.onreadystatechange = () => {
                if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
                    resolve(JSON.parse(x.responseText))
                }
                else if (x.status != 200){
                    reject(new Error('status is not 200'))
                }
            }
        })
    }

	
    jsSend.onclick =function()
    {
        if(jsMessage.value != ""){
		
		let message = String(jsMessage.value).replace(/:\)|:\(|:beer:|:bad:/g, function(word){
								let arrSmaile = {
									":\)": "<img src=http://abali.ru/wp-content/uploads/2014/01/JC_cheesy.gif>",
									":\(": "<img src=http://abali.ru/wp-content/uploads/2014/01/2.gif>",
									":beer:": "<img src=http://abali.ru/wp-content/uploads/2014/01/friends.gif>",
									":bad:": "<img src=http://abali.ru/wp-content/uploads/2014/01/JC_doubledown.gif>",
								};[word];
								
								return arrSmaile[word] || word;
							});

        const obj = {
            func: "addMessage",
            nick: /*jsNick.value || */"Mine",
            message: message,
            id: 000001,
        };
   
        jsonPost("http://students.a-level.com.ua:10012", obj);        
        jsMessage.value ="";
        }
    }

  

let countMess = 4000;
function getMess(){
    
        const get = {
        func: "getMessages",
        messageId: countMess,
        };

jsonPost("http://students.a-level.com.ua:10012", get)
        .then(response =>{
            const obj = response;     
            
            for(i = 0; i <  obj.data.length; i++){               
                const   p       = document.createElement("p"),
                        Nick    = document.createElement("p"),
                        contein = document.createElement("div");

                    if(obj.data[i].id === 000001){
                        p.id 		= "jsmyMessage";
                        Nick.id 	= "jsMyNick";
                        contein.id  = "jsmessConteiner";

                        changeMode(p, Nick, true)                                      

                    }else { 
                        p.id 		= "jsotherMessage";
                        Nick.id 	= "jsnick";
                        contein.id  = "jsmessConteinerLeft";

                        changeMode(p, Nick, false)
                    }

                    function changeMode(mess, n, bool){
                        if(bool){
                            if(count == "jscolor"){
                                n.className       = "MyNick";
                                mess.className    = "myMessage";                               
                            }else if(count == "jslight"){
                                n.className       = "lightmynick";
                                mess.className    = "lightmymessage";                                
                            }
                        } else {
                            if(count == "jscolor"){                                
                                n.className         = "nick";
                                mess.className      = "othermessage";

                            }else if(count == "jslight"){
                                n.className         = "lightnick";
                                mess.className      = "lightothermessage";
                            }
                        }
                    }
                    
 
                if(obj.data[i].message != 0){
                    Nick.innerHTML = obj.data[i].nick;

                    let mess = String(obj.data[i].message).replace(/:\)|:\(|:beer:|:bad:/g, function(word){
								let arrSmaile = {
									":\)": "<img src=http://abali.ru/wp-content/uploads/2014/01/JC_cheesy.gif>",
									":\(": "<img src=http://abali.ru/wp-content/uploads/2014/01/2.gif>",
									":beer:": "<img src=http://abali.ru/wp-content/uploads/2014/01/friends.gif>",
									":bad:": "<img src=http://abali.ru/wp-content/uploads/2014/01/JC_doubledown.gif>",
								};[word];
								
								return arrSmaile[word] || word;
							});
							


                    	/*mess = String(obj.data[i].message).replace(/:\(/g, '<img src="http://abali.ru/wp-content/uploads/2014/01/2.gif">');*/
                    	/*if(/^www\.youtube\.com\/embed\/\S*$/.test(String(obj.data[i].message))){
                    		mess = changeURL(String(obj.data[i].message));
                    	};
                    	
                    	function changeURL(url) {

 							return url.replace(/^www\.youtube\.com\/embed\/\S*$/g, '<iframe width="560" height="315" src="'+ "https://www.youtube.com/embed/" +/\/\S*$/ + 'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'); 
						}*/

                    p.innerHTML = (mess);
                    
                    // chat.insertBefore(p, chat.children[0]);
                    jsChat.appendChild(Nick)
                    contein.appendChild(p)
                    jsChat.appendChild(contein)
                }            
            countMess = obj.nextMessageId;
            }
        })
         .then(response =>{
	          var objDiv = document.getElementById("jsChat");
	          objDiv.scrollTop = objDiv.scrollHeight-100;
        })        
    }
setInterval(getMess, 5000)

let count = "jscolor";
function turnMode(elem){
    
    elem.onclick = function(){
        count = this.id;

        /*if(count == "jsnight"){
            jsnight.style.opacity = 1;
            jslight.style.opacity = 0.5;
            jscolor.style.opacity = 0.5;

            document.body.style.background = "linear-gradient(to top, grey, black)";
            for(let i = 0; i < jsotherMessage.length; i++){
                    jsnick[i].className         = "nick";
            }

                for(let i = 0; i < jsmyMessage.length; i++){
                    jsMyNick[i].className       = "mynick";
            }            
        }*/

        if(count == "jslight"){
            /*jsnight.style.opacity = 0.5;*/
            jslight.style.opacity = 1;
            jscolor.style.opacity = 0.5;
            document.body.style.background = "url(../img/mainBack.jpg) no-repeat top / cover";
            backgroundColor = "";
         

                for(let i = 0; i < jsotherMessage.length; i++){
                    jsnick[i].className         = "lightnick";
                    jsotherMessage[i].className = "lightothermessage";
                }

                for(let i = 0; i < jsmyMessage.length; i++){
                    jsMyNick[i].className       = "lightmynick";
                    jsmyMessage[i].className    = "lightmymessage";
                }
        }
        else if(count == "jscolor"){
            /* jsnight.style.opacity = 0.5;*/
            jslight.style.opacity = 0.5;
            jscolor.style.opacity = 1;
               document.body.style.background = "";
            
            for(let i = 0; i < jsotherMessage.length; i++){
                jsnick[i].className         = "nick";
                jsotherMessage[i].className = "othermessage";
            }

            for(let i = 0; i < jsmyMessage.length; i++){
                jsMyNick[i].className       = "MyNick";
                jsmyMessage[i].className    = "myMessage";
            }
        }
}}
/*turnMode(jsnight)*/
turnMode(jslight)
turnMode(jscolor)



