import{readFileSync as r,writeFileSync as w}from'node:fs';
let p='docs/combatant/work/vi-a/rules.json',o=JSON.parse(r(p));
Object.assign(o,{
'If not, {0} {1}':'Nếu không, gây {0} {1}',
'gain {0} {1} equal to that card’s Cost':'Nhận {0} {1} với mỗi điểm Chi phí của lá đó',
'On {0}, decrease Cost by {1} for {2} turn until {3}d':'Khi {0}, giảm Chi phí đi {1} trong {2} lượt hoặc đến khi {3}',
'{0} {1} {2} {3} Attack Card(s) of this unit':'{0} {1} {2} lá Tấn công {3} của Nhân vật này',
'{0} {1} {2} {3} card(s) of this unit':'{0} {1} {2} lá {3} của Nhân vật này',
'For {0} turn, for each ally, decrease Cost of the next {1} card {2}d by that ally by {3}':'Trong {0} lượt, với mỗi đồng minh, giảm Chi phí của lá {1} tiếp theo do đồng minh đó {2} đi {3}',
'At the start of the next turn, {0} {1} {2} card(s) of this unit':'Đầu lượt tiếp theo, {0} {1} lá {2} của Nhân vật này',
'At the start of the next turn, {0} {1} {2} card(s)':'Đầu lượt tiếp theo, {0} {1} lá {2}',
'At the start of the next turn, {0} {1} {2} card(s) of this unit, then decrease Cost of those cards by {3} for {4} turn or until {5}d':'Đầu lượt tiếp theo, {0} {1} lá {2} của Nhân vật này, sau đó giảm Chi phí của các lá đó đi {3} trong {4} lượt hoặc đến khi {5}',
'For {0} {1} card in hand at the end of the turn, {2} a {3} card next turn':'Với {0} lá {1} trên tay cuối lượt, {2} một lá {3} ở lượt tiếp theo'
});w(p,JSON.stringify(o,null,2));
p='docs/combatant/work/vi-a/words.json';o=JSON.parse(r(p));Object.assign(o,{'Sniper’s Domain':'Sniper’s Domain','Position Hold':'Position Hold'});w(p,JSON.stringify(o,null,2));
