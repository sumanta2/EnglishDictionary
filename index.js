const createElemeint=(parent,heading,myData)=>{
    
    parent=="myDiv"?parent='myDiv':parent=`contain${parent}`;
    
    var target=document.getElementById(parent);
    
    if(typeof myData==='undefined')
    {
        myData="---";
    }

    var newElement=`<div class='contain'><p class='p'><b>${heading}</b></p><span class='span'>${myData}</span></div>`;
    target.insertAdjacentHTML("beforeend",newElement);
}

function clearScreen()
{
    var target=document.getElementById('myDiv');

    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
}

function checkMargeValue(mydata)
{
    var allData='';
    if(typeof mydata!=='undefined' && mydata.length >0)
    {
        mydata.forEach((value)=>{
        allData+=value+", ";
        console.log(value);  
        })
        console.log(mydata)
    }
    else{
        allData="---"
    }
    return allData;
}

function makeParent(no) 
{
    var target=document.getElementById('myDiv');
    var newElement=`<div id='contain${no}' class='store'></div>`;
    target.insertAdjacentHTML("beforeend",newElement);

}

document.getElementById('clearBtn').addEventListener("click",()=>{
    document.getElementsByClassName('inputData')[0].value="";
})


document.getElementById('myButton').addEventListener("click",()=>{
   var inputValue= document.getElementsByClassName('inputData')[0].value;
   //inputValue='cat';
    if(inputValue==='')
    {
        clearScreen()
        createElemeint("myDiv","!ERROR",'Blank Value are not allowed')
        setTimeout(clearScreen,6000)
    }
    else
    {
        clearScreen()
        createElemeint("myDiv","SEARCHING",'Please Wait a moment...');
        
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
        .then(responce=>{
            return responce.json();
        }).then(myname=>{
            console.log(myname)
            clearScreen()
            if(myname.title=="No Definitions Found")
            {
                clearScreen()
                createElemeint("myDiv","!ERROR","Please Check Your Spelling")
                setTimeout(clearScreen,6000)
            }
            else
            {
                makeParent(0);
                createElemeint(0,'WORD',myname[0].word);
                createElemeint(0,'PHONETIC SPALING',myname[0].phonetic);

                makeParent(1);
                createElemeint(1,'PART-OF-SPEECH',myname[0].meanings[0].partOfSpeech);
                createElemeint(1,'DEFINITION',myname[0].meanings[0].definitions[0].definition);

                createElemeint(1,'EXAMPLE',myname[0].meanings[0].definitions[0].example);
            
                createElemeint(1,'SYNONYMS',checkMargeValue(myname[0].meanings[0].definitions[0].synonyms));

                createElemeint(1,'ANTONYMS',checkMargeValue(myname[0].meanings[0].definitions[0].antonyms));

                
            }

        })
        .catch(err=>{
                console.log(err);
                clearScreen()
                createElemeint("!ERROR",err)
                setTimeout(clearScreen,6000)
        })
    
    }

})

