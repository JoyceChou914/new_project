


    const _Math = {
        randInt: function(low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
        },
        randFloat: function(low, high) {
        return low + Math.random() * (high - low);
        },
        distance: function(x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
    };
    
    class Vector2 {
        constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        }
    
        clone() {
        return new this.constructor(this.x, this.y);
        }
    }
    
    class CanvasSystem {
        constructor(id) {
        this.Wrapper = undefined;
        this.canvas = undefined;
        this.context = undefined;
        this.timer = undefined;
        if (id) this.init(id);
        }
    
        init(id) {
        this.Wrapper = document.getElementById(id);
        console.log(this.Wrapper)
        this.canvas = document.createElement("canvas");
        this.setSize(this.Wrapper.clientWidth, this.Wrapper.clientHeight);
        this.Wrapper.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
    
        return this;
        }
    
        setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        }
    
        draw(fun) {
        fun(this.context);
        }
    
        update(fun) {
        let self = this;
        _update();
    
        function _update() {
            self.timer = requestAnimationFrame(_update);
            fun(self.context);
        }
        }
    
        stop() {
        cancelAnimationFrame(this.timer);
        console.warn("cancelAnimationFrame!");
        }
    
        clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        //下面是背景色#f00//
        fillRect(fillStyle = "#b0c4de") {
        this.context.fillStyle = fillStyle;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    
        bindEvent(e, f) {
        this.canvas.addEventListener(e, f, false);
        }
    }
    
    // 雨线
    class RainLine {
        constructor(position) {
        this.position = position;
        this.speed = _Math.randFloat(5, 10); //速度//
        this.width = _Math.randFloat(0.5, 1);//寬高//
        this.height = _Math.randFloat(20, 40);

        let temp = Math.floor(this.height * 69/ 75);
        this.color = `rgba(43,64,105,1)`;
        //雨滴顏色//
        }
    
        render(ctx, speedx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(
            this.position.x + this.height * speedx,
            this.position.y + this.height
        );
        ctx.stroke();
        }
    }
    
    // 雨点水花
    class RainDrop {
        constructor(position) {
        this.position = position;
        this.vector = new Vector2(_Math.randFloat(-4, 4), _Math.randFloat(-9, -3));
        this.radius = Math.random() * 1.5 + 1;
        }
    
        render(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.arc(
            this.position.x,
            this.position.y,
            this.radius,
            Math.random() * Math.PI * 2,
            1 * Math.PI
        );
        ctx.stroke();
        }
    }
    
    class RainSystem {
        constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.lineList = [];
        this.dropList = [];
        this.gravity = 0.5;
        }
    
        render(speedx, mousePos) {
        let self = this;
    
        // 雨线的运动
        self.lineList.forEach((item, i) => {
            let dist = _Math.distance(
            item.position.x + speedx * item.height - mousePos.x,
            item.position.y + item.height - mousePos.y
            );
            if (dist < 30) {
            item.died = true;
            self.createDrop(item.position, item.height);
            }
            if (
            item.width > 4.5 &&
            item.position.y + item.height >
                self.canvas.height - Math.random() * self.canvas.height / 5
            ) {
            item.died = true;
            self.createDrop(item.position, item.height);
            }
            if (item.position.y >= self.canvas.height) {
            item.died = true;
            } else {
            item.position.x += item.speed * speedx;
            item.position.y += item.speed;
            }
            item.render(self.context, speedx);
            if (item.died) self.lineList.splice(i, 1);
        });
    
        // 水花的动画
        self.dropList.forEach((item, i) => {
            item.vector.x += speedx / 2;
            item.vector.y += self.gravity;
            item.position.x += item.vector.x;
            item.position.y += item.vector.y;
            if (item.position.y > self.canvas.height) {
            self.dropList.splice(i, 1);
            }
    
            item.render(self.context);
        });
        }
    
        // 创建水花
        createDrop(position, height) {
        let self = this;
        let num = _Math.randInt(5, 10);
        for (let i = 0; i < num; i++) {
            let pos = position.clone();
            pos.y += height;
            self.dropList.push(new RainDrop(pos));
        }
        }
    }


       //document宣告//
        document.addEventListener("DOMContentLoaded",function(){
        //JS內容
        });
    
    let mousePos = new Vector2();
    let speedx = 0;
    let cs = new CanvasSystem("Wrapper");
    
    cs.bindEvent("mousemove", e => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        speedx = (e.clientX - cs.canvas.width / 2) / (cs.canvas.width / 2);
    });
    
    window.addEventListener("resize", () => {
        cs.setSize(window.innerWidth, window.innerHeight);
    });
    cs.setSize(window.innerWidth, window.innerHeight);

    
    let rainSystem = new RainSystem(cs.canvas, cs.context);
    
    cs.update(render);
    
    function render() {
        cs.fillRect();
        rainSystem.lineList.push(
        new RainLine(new Vector2(_Math.randFloat(0, cs.canvas.width), 0))
        );
        rainSystem.render(speedx, mousePos);
    }