window.BossEconomy={
KEY:"codingBossEconomyV1",
load(){let d=null;try{d=JSON.parse(localStorage.getItem(this.KEY)||"null")}catch(e){};if(!d)d={bossClears:[],spentMedals:0,ownedItems:[]};d.bossClears=d.bossClears||[];d.spentMedals=Number(d.spentMedals||0);d.ownedItems=d.ownedItems||[];return d},
save(d){try{localStorage.setItem(this.KEY,JSON.stringify(d))}catch(e){}},
clearId(l,s){return `${l}-${s}`},
isCleared(l,s){return this.load().bossClears.includes(this.clearId(l,s))},
award(l,s){const d=this.load(),id=this.clearId(l,s),first=!d.bossClears.includes(id);if(first)d.bossClears.push(id);this.save(d);return{first,total:d.bossClears.length,balance:Math.max(0,d.bossClears.length-d.spentMedals)}},
collected(){return this.load().bossClears.length},
balance(){const d=this.load();return Math.max(0,d.bossClears.length-d.spentMedals)},
owned(id){return this.load().ownedItems.includes(id)},
buy(id,cost){const d=this.load();if(d.ownedItems.includes(id))return{ok:false,reason:"owned",balance:this.balance()};const bal=Math.max(0,d.bossClears.length-d.spentMedals);if(bal<cost)return{ok:false,reason:"medal",balance:bal};d.spentMedals+=cost;d.ownedItems.push(id);this.save(d);return{ok:true,balance:Math.max(0,d.bossClears.length-d.spentMedals)}}
};