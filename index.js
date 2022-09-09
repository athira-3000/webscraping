
const express=require('express');
const axios=require('axios');
const cheerio=require('cheerio');
const app=express();

const PORT=process.env.PORT||3000;


const article=[];

async function doWork(){
    try{
    const htmlData=await axios.get('https://www.manchestereveningnews.co.uk/');
    const $=await cheerio.load(htmlData.data);
    $('.teaser-text').each((index,children)=>{
        const title=$(children).children('.headline').text();
        const titleURL=$(children).children('.headline').attr('href');
        article.push({title,titleURL});
    });
    }catch(e){
        console.log(e);
    };
};

doWork();

app.get('/',function(req,res){
    res.send(article);
});




app.listen(PORT,()=>console.log(`listening on port ${PORT}`));