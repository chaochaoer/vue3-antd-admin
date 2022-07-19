//生成并渲染出验证码图形
/**
 * 
 * @param {number} length  [需要的验证码长度]
 * @param {Object} element [元素]
 * @returns 
 */
export default function createCanvasCode(length: number, element: HTMLCanvasElement) {
  let show_num = [];
  let canvas_width = element.offsetWidth;
  let canvas_height = element.offsetHeight;
  let canvas = element; //获取到canvas的对象，演员
  canvas.style.background = '#ccc'
  let context = canvas.getContext('2d')!; //获取到canvas画图的环境，演员表演的舞台
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  let sCode =
    'a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0';
  let aCode = sCode.split(',');
  let aLength = aCode.length; //获取到数组的长度

  for (let i = 0; i < length; i++) {
    let j = Math.floor(Math.random() * aLength); //获取到随机的索引值
    let deg = Math.random() - 0.5; //产生一个随机弧度
    let txt = aCode[j]; //得到随机的一个内容
    show_num[i] = txt.toLowerCase();
    let x = 10 + i * 20; //文字在canvas上的x坐标
    let y = 25 + Math.random() * 8; //文字在canvas上的y坐标
    context.font = 'bold 28px 微软雅黑';

    context.translate(x, y);
    context.rotate(deg);

    context.fillStyle = '#181B27';
    context.fillText(txt, 0, 0);

    context.rotate(-deg);
    context.translate(-x, -y);
  }
  for (let i = 0; i <= 5; i++) {
    //验证码上显示线条
    context.strokeStyle = createCanvasCode.randomColor();
    context.beginPath();
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.stroke();
  }
  for (let i = 0; i <= 30; i++) {
    //验证码上显示小点
    context.strokeStyle = createCanvasCode.randomColor();
    context.beginPath();
    let x = Math.random() * canvas_width;
    let y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }
  return show_num.join("").toLowerCase()
}
//得到随机的颜色值
createCanvasCode.randomColor = function () {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
