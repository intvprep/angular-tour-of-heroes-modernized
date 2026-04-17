function flipCoin(){
    return Math.random() < 0.5;
}

for(let i=0; i<10; i++){
    console.log(i + " :: " + (flipCoin() ? 'Heads' : 'Tails'));
}