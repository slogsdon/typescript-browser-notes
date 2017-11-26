// tslint:disable:no-any
var lastTime = 0;

(global as any).requestAnimationFrame =
  (callback: (time: number) => void, element: Element) => {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = global.setTimeout(
      () => callback(currTime + timeToCall),
      timeToCall
    );
    lastTime = currTime + timeToCall;
    return id;
  };
