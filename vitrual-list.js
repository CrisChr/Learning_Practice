import React from 'react';

let num = 0;
export default class extends React.Component{
  state = {
    list: new Array(9999).fill(0).map(() => {
      num++;
      return  num;
    }),
    scrollBoxHeight: 500, // 容器初始化高度
    renderList: [], // 渲染列表（可视区域）
    itemHeight: 10, // 列表每一项高度
    bufferCount: 8, // 缓冲区数量
    renderCount: 0, // 渲染数量
    start: 0, // 起始位置
    end: 0 // 终止位置
  }
  listBox = null;
  scrollBox = null;
  scrollContent = null;

  componentDidMount(){
    const {itemHeight, bufferCount} = this.state;
    /**计算容器高度 */
    const scrollBoxHeight = this.listBox.offsetHeight; // 滚动区域高度
    const renderCount = Math.ceil(scrollBoxHeight / itemHeight) + bufferCount; // 计算可视区域渲染数量
    const end = renderCount + 1;
    this.setState({
      scrollBoxHeight,
      end,
      renderCount
    });
  }

  handleScroll = () => {
    const {scrollTop} = this.scrollBox;
    const {itemHeight, renderCount} = this.state;
    // console.log(scrollTop, scrollTop % itemHeight)
    this.scrollContent.style.transform = `translate3d(0, ${scrollTop}px, 0)`; /* translate3d 开启gpu 加速 ，可视内容区域滚动的距离*/
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1);
    this.setState({start, end});
  }

  shouldComponentUpdate(_, nextState){
    return this.state.start !== nextState.start || this.state.end !== nextState.end;
  }

  render(){
    const {list, scrollBoxHeight, itemHeight, start, end} = this.state;
    const renderList = list.slice(start, end);
    return(
      <div ref={ref => this.listBox = ref}>
        {/**滚动区域 */}
        <div style={{height: scrollBoxHeight, overflow: 'scroll', position: 'relative'}}
          ref={ref => this.scrollBox = ref} onScroll={this.handleScroll}
        >
          {/**占位区 */}
          <div style={{height: `${list.length * itemHeight}px`, position: 'absolute', left: 0, top: 0, right: 0}}></div>

          {/**渲染显示区 */}
          <div ref={ref => this.scrollContent = ref} style={{position: 'relative', left: 0, top: 0, right: 0}}>
            {
              renderList.map((item, index) => (
                <div key={index} style={{background: 'lightblue'}}>
                  {item + ' '} Item
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}