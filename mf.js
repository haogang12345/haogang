	class Magnifier{
		constructor(newSmallBox,newMask,newBigBox) {
		    this.smallBox = newSmallBox;
			this.mask = newMask;
			this.bigBox = newBigBox;
		}
		
		mouseover(){
			let that = this;
			this.smallBox.onmouseover = function(){
				that.mask.style.display = "block";
				that.bigBox.style.display = "block";
			}
		}
		
		mouseout(){
			let that = this;
			this.smallBox.onmouseout = function(){
				that.mask.style.display = "none";
				that.bigBox.style.display = "none";
			}
		}
		
		mousemove(){
			let that = this;
			this.smallBox.onmousemove = function(evt){
				let e = evt || event;
				
				let left = e.pageX - this.offsetLeft - that.mask.offsetWidth/2;
				let top = e.pageY - this.offsetTop - that.mask.offsetHeight/2;
				
				if(left < 0){
					left = 0;
				}
				
				let maxLeft = this.offsetWidth - that.mask.offsetWidth;
				
				if(left > maxLeft){
					left = maxLeft;
				}
				
				if(top < 0){
					top = 0;
				}
				
				let maxTop = this.offsetHeight - that.mask.offsetHeight;
				
				if(top > maxTop){
					top = maxTop;
				}
				
				let x = left*that.bigBox.offsetWidth/that.mask.offsetWidth;
				let y = top*that.bigBox.offsetHeight/that.mask.offsetHeight;
				
				that.mask.style.left = left + "px";
				that.mask.style.top = top + "px";
				
				that.bigBox.style.backgroundPositionX = -x + "px";
				that.bigBox.style.backgroundPositionY = -y + "px";
			}
		}
		
		bindEvent(){
			this.mouseover();
			this.mouseout();
			this.mousemove();
		}
	}