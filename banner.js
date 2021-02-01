let wrap = document.getElementById('wrap')
let next = document.getElementById("next")
    // 页面中所有图片li的NodeList
let liList = document.querySelectorAll("#imgWrap li");
let n = 0; // 代表当前显示哪一张图片的下标
let dotWrap = document.getElementById("dotWrap");

function changeImg() {
    // 根据n的值来切换图片显示状态和小圆点的聚焦状态
    for (let i = 0; i < liList.length; i++) {
        liList[i].style.display = "none";
        dotList[i].className = "";
    }
    dotList[n].className = 'focus';

    liList[n].style.display = "block";
    liList[n].style.opacity = 0;
    let fade = setInterval(function() {
        let o = Number(liList[n].style.opacity)
        if (o >= 1) {
            clearInterval(fade);
            liList[n].style.opacity = 1;
            return;
        }
        liList[n].style.opacity = o + 0.03;
    }, 16)

}

next.onclick = function() {
    if (n !== liList.length - 1) {
        n++;
    } else {
        n = 0;
    }
    changeImg();
}
prev.onclick = function() {
    if (n !== 0) {
        n--;
    } else {
        n = liList.length - 1;
    }
    changeImg();
}

// 小圆点动态生成
for (let i = 0; i < liList.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("data-index", i)
    dotWrap.appendChild(li)

    li.onclick = function() {
        n = Number(this.getAttribute("data-index"))
        changeImg()
    }

}
// 所有小圆点li的NodeList
let dotList = document.querySelectorAll("#dotWrap li");
dotList[0].className = "focus";


// 自动播放
var autoPlay = setInterval(function() {
    next.click()
}, 3000)

// 智能判断
wrap.onmouseenter = function() {
    clearInterval(autoPlay)
}
wrap.onmouseleave = function() {
    autoPlay = setInterval(function() {
        next.click()
    }, 3000)
}