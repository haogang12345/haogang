$(".slip").mouseover(function() {
    $(this).css({
        color: "skyblue"
    }).siblings(this).css({
        color: "#afafaf"
    })
})
class Magnifier {
    constructor(newSmallBox, newBigBox, newMask) {
        this.smallbox = newSmallBox;
        this.bigbox = newBigBox;
        this.mask = newMask;
    }
    onmouseover() {
        let that = this;
        this.smallbox.onmouseover = function() {
            that.bigbox.style.display = "block";
            that.mask.style.display = "block";
        }
    }
    onmouseout() {
        let that = this;
        this.smallbox.onmouseout = function() {
            that.bigbox.style.display = "none";
            that.mask.style.display = "none";
        }
    }
    onmousemove() {
        let that = this;
        this.smallbox.onmousemove = function(evt) {
            let e = evt || event;
            let left = e.pageX - this.offsetLeft - 80 - that.mask.offsetWidth / 2;
            let top = e.pageY - 165 - that.mask.offsetHeight / 2;

            if (left < 0) {
                left = 0;
            }

            let maxLeft = that.smallbox.offsetWidth - that.mask.offsetWidth;

            if (left > maxLeft) {
                left = maxLeft;
            }

            if (top < 0) {
                top = 0;
            }

            let maxTop = that.smallbox.offsetHeight - that.mask.offsetHeight;

            if (top > maxTop) {
                top = maxTop;
            }
            that.mask.style.left = left + "px";
            that.mask.style.top = top + "px";

            //比例尺
            //小图片:大图片 = 小窗口:大窗口
            //that.mask.offsetWidth*x = left * that.bigBox.offsetWidth;

            let x = that.bigbox.offsetWidth * left / that.mask.offsetWidth;
            let y = that.bigbox.offsetHeight * top / that.mask.offsetHeight;
            //背景图片的定位
            that.bigbox.style.backgroundPositionX = -x + "px";
            that.bigbox.style.backgroundPositionY = -y + "px";
        }
    }

}

let oSmallBox = document.getElementById("small-box");
let oBigBox = document.getElementById("big-box");
let oMask = document.getElementById("mask");
let mf = new Magnifier(oSmallBox, oBigBox, oMask);
mf.onmouseover();
mf.onmouseout();
mf.onmousemove();

$("#desc").click(function() {
    let t = $(".pronum").val();
    if (t > 1) {
        t--;
        $(".pronum").val(t);
    }
})
$("#incr").click(function() {
    let t = $(".pronum").val();
    t++;
    $(".pronum").val(t);
})

let ss = sessionStorage;
if (ss.getItem("tel")) {
    $("#loginin").html(ss.getItem("tel") + "登录成功");
    $("#loginin").css({
        color: "skyblue"
    })
    $(".cart").click(function() {
        window.location.href = "http://10.35.164.34/WWW/GUCCI/shoppingcart.html";
    })
    $("#myorder").click(function() {
        window.location.href = "http://10.35.164.34/WWW/GUCCI/order.html";
    })
} else {
    $(".cart").click(function() {
        window.location.href = "http://127.0.0.1/2008php/Honor/login/login.html";
    })
}