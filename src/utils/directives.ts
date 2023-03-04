// 拖拽的指令
const drag = {
    beforeMount(el: any, binding: any) {

        // 自定义属性，判断是否可拖拽
        if (!binding.value) return
        const dialogHeaderEl = el.querySelector('.dialog_header')
        const dragDom = el.querySelector('.dialog_content')
        dialogHeaderEl.style.cssText += ';cursor:move;'

        // dragDom.style.cssText += ';bottom:0px;'

        // 定义位置默认值
        // setTimeout(() => {
        //     Object.defineProperty(window, "address", {
        //         value: [[dragDom.offsetLeft, dragDom.offsetTop],
        //         [el.clientWidth - dragDom.offsetLeft, el.clientHeight - dragDom.offsetTop]],
        //         configurable: true,
        //         writable: true
        //     });
        // }, 0)






        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = (function () {
            if ((document.body as any).currentStyle) {
                // 在ie下兼容写法
                return (dom: any, attr: any) => dom.currentStyle[attr]
            }
            return (dom: any, attr: any) => getComputedStyle(dom, null)[attr]
        })()



        dialogHeaderEl.ontouchstart = (fatherE: any) => {
            let e = fatherE.changedTouches[0]

            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop


            // console.log(elWidth, elHeight);

            const elWidth = el.clientWidth
            const elHeight = el.clientHeight

            const dragDomWidth = dragDom.offsetWidth // 对话框宽度
            const dragDomHeight = dragDom.offsetHeight // 对话框高度




            // console.log(dragDomWidth, dragDomheight);

            const minDragDomLeft = dragDom.offsetLeft
            const maxDragDomLeft = elWidth - dragDom.offsetLeft - dragDomWidth
            // console.log(minDragDomLeft, maxDragDomLeft);

            const minDragDomTop = dragDom.offsetTop
            const maxDragDomTop = elHeight - dragDom.offsetTop - dragDomHeight

            // 获取到的值带px 正则匹配替换
            let styL = sty(dragDom, 'left')
            // console.log(styL);

            // 为兼容ie
            if (styL === 'auto') styL = '0px'
            let styT = sty(dragDom, 'top')

            // console.log(styL)

            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
                styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
            } else {
                styL = +styL.replace(/px/g, '')
                styT = +styT.replace(/px/g, '')
            }

            document.ontouchmove = function (event) {
                let e = event.changedTouches[0]
                // 通过事件委托，计算移动的距离
                let left = e.clientX - disX
                let top = e.clientY - disY
                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -(minDragDomLeft)
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft
                }

                if (-(top) > minDragDomTop) {
                    top = -(minDragDomTop)
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop
                }
                // Object.defineProperty(window, "address", {
                //     value: [[dragDom.offsetLeft, dragDom.offsetTop],
                //     [dragDom.offsetLeft + dragDomWidth, dragDom.offsetTop + dragDomHeight]],
                //     configurable: true,
                //     writable: true
                // });

                // 移动当前元素
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
            }

            document.ontouchend = function (e: any) {

                document.ontouchmove = null
                document.ontouchend = null



            }
            return false
        }

    }
}
// 挂载，注册
const directives = {
    install: function (app: any) {
        app.directive('dialogDrag', drag)
    }
};
export default directives;
