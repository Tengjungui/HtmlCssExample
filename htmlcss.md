# html、css基础
#### 一、html部分
1. 11个常用的html标签

   `（1）`标题标签heading

     - h1创建最大的标题

     - h2创建第二大的标题

     - ...

     - h6  创建最小的标题

    `（2）`段落paragraph  p

    `（3）`换行(单标签)  br

    `（4）`超链接   a

    `（5）`水平线  hr

    `（6）`无序列表 ul>li

    `（7）`有序列表  ol>li

    `（8）`文本横排  span

    `（9）`插入图片  img

    `（10）`表格  table>tr>td/th

    `（11）`字体的大小和颜色  font

  ---
2. 块级元素和内嵌元素的区别和相互转换
    - 块级元素 一般用来搭建网站架构、布局、承载内容……像这些大体力活都属于块级元素的，它包括以下这些标签：
      ```html
      address、blockquote、center、dir、div、dl、dt、dd、fieldset、form、h1~h6、hr、isindex、menu、noframes、noscript、ol、p、pre、table、ul
      ```
    - 内嵌元素 一般用在网站内容之中的某些细节或部位，用以“强调、区分样式、上标、下标、锚点”等等，下面这些标签都属于内嵌元素：
      ```html
      a、abbr、acronym、b、bdo、big、br、cite、code、dfn、em、font、i、img、input、kbd、label、q、s、samp、select、small、span、strike、strong、sub、sup、textarea、tt、u、var
      ```
    - 块元素 和 内嵌元素 是可以互相转换的，转换的代码如下：
      ```css
      display: block; /* 转成块元素 */
      display: inline; /* 转成内嵌元素 */
      ```
  ---
3. 元素的嵌套规则
    1. 块元素可以包含内联元素或某些块元素，但内联元素却不能包含块元素，它只能包含其它的内联元素：
        ```html
          <div><h1></h1><p></p></div> —— 对
          <a href="#"><span></span></a> —— 对
          <span><div></div></span> —— 错
        ```
   2. 块级元素不能放在p里面：
        ```html
          <p><ol><li></li></ol></p> —— 错
          <p><div></div></p> —— 错
        ```
   3. 有几个特殊的块级元素只能包含内嵌元素，不能再包含块级元素，这几个特殊的标签是：
        ```html
          h1、h2、h3、h4、h5、h6、p、dt
        ```
   4. li 内可以包含 div 标签
        ```html
          li 和 div 标签都是装载内容的容器，地位平等，没有级别之分（例如：h1、h2 这样森严的等级制度^_^），要知道，li 标签连它的父级 ul 或者是 ol 都可以容纳的
        ```
   5. 块级元素与块级元素并列、内嵌元素与内嵌元素并列：
        ```html
          <div><h2></h2><p></p></div> —— 对
          <div><a href="#"></a><span></span></div> —— 对
          <div><h2></h2><span></span></div> —— 错
        ```
  ---
4. 元素常用属性详解
    <p><font color=#DB984D>accesskey规定激活元素的快捷键。</font><font color=red>不支持Opera</font></p>

    *  <p>注释：以下元素支持 accesskey 属性：a, area, button, input, label, legend 以及 textarea。</p>

    <p><font color=#DB984D>contenteditable 规定元素内容是否可编辑</font></p>

    <p><font color=#DB984D>data-  自定义属性(不支持ie10及以下浏览器)</font></p>

    ```javascript
    var content= document.getElementById('content');

    alert(content.dataset.age)

    //jquery
    $('#content').data('age');//读
    ```
    <p><font color=#DB984D>dir属性规定元素中内容的文本方向。（ltr rtl）   支持所有浏览器</font></p>

    *  <p>注释：dir 属性在以下标签中无效：base, br, frame, frameset, hr, iframe, param 以及 script。</p>

    <p><font color=#DB984D>draggable 规定元素是否可拖动。不支持ie8及以下浏览器</font></p>

    *  <p>这里的拖动并不是我们所想的拖到那个位置元素就定在哪个位置！用来做得最多的便是现在网上见得比较多的拖拽上传</p>

    <p><font color=#DB984D>dropzone规定在元素上拖动数据时，是否拷贝、移动或链接被拖动数据。（目前主流浏览器都不支持）</font></p>

      * copy 拖动数据会产生被拖动数据的副本。
      * move 拖动数据会导致被拖动数据被移动到新位置。
      * link 拖动数据会产生指向原始数据的链接。
      <p></p>
      <p><font color=#DB984D>hidden规定元素仍未或不再相关</font></p>

      * <p>其实和css中的display:none的表现形式是一样的，并且hidden属性并不支持ie6、7</p>

      <p><font color=#DB984D>id规定 HTML 元素的唯一的 id</font></p>

      <p><font color=#DB984D>lang规定元素内容的语言。</font></p>

      <p><font color=#DB984D>style</font></p>

      <p><font color=#DB984D>title规定有关元素的额外信息。</font></p>
---

# 二、css部分

#### 一、css常用属性

<p><font color=#DB984D>字体属性：font</font></p>

```css
大小 font-size: x-large;(特大) xx-small;(极小) 一般中文用不到，只要用数值就可以，单位：PX、PD

样式 font-style: oblique;(偏斜体) italic;(斜体) normal;(正常)

行高 line-height: normal;(正常) 单位：PX、PD、EM

粗细 font-weight: bold;(粗体) lighter;(细体) normal;(正常)

变体 font-variant: small-caps;(小型大写字母) normal;(正常)

大小写 text-transform: capitalize;(首字母大写) uppercase;(大写) lowercase;(小写) none;(无)

修饰 text-decoration: underline;(下划线) overline;(上划线) line-through;(删除线) blink;(闪烁)

常用字体： (font-family)
"Courier New", Courier, monospace, "Times New Roman", Times, serif, Arial, Helvetica, sans-serif, Verdana
```

<p><font color=#DB984D>背景属性：background</font></p>

```css
色彩background-color: #fff;

图片background-image: url();

重复background-repeat: no-repeat;

滚动background-attachment: fixed;(固定) scroll;(滚动)

位置background-position: left(水平) top(垂直);

简写方法 background:#000 url(..) repeat fixed left top;

```

<p><font color=#DB984D>区块属性：block</font></p>

```css
字间距letter-spacing: normal; 数值

对齐text-align: justify;(两端对齐) left;(左对齐) right;(右对齐) center;(居中)

缩进text-indent: 数值px;

垂直对齐vertical-align: baseline;(基线) sub;(下标) super;(下标) top; text-top; middle; bottom; text-bottom;

词间距word-spacing: normal; 数值

空格white-space: pre;(保留) nowrap;(不换行)

显示display:block;(块) inline;(内嵌) list-item;(列表项) run-in;(追加部分) compact;(紧凑) marker;(标记) table; inline-table; table-raw-group; table-header-group; table-footer-group; table-raw; table-column-group; table-column; table-cell; table-caption;(表格标题)

```
<p><font color=#DB984D>方框属性：Box</font></p>

```css
width:; height:; float:; clear:both; margin:; padding:;     顺序：上右下左

边框属性：border

border-style: dotted;(点线) dashed;(虚线) solid; double;(双线) groove;(槽线) ridge;(脊状) inset;(凹陷) outset;

border-width:; 边框宽度

border-color:;

简写方法border：width style color;

列表属性：list

类型list-style-type:    disc;(圆点) circle;(圆圈) square;(方块) decimal;(数字) lower-roman;(小罗码数字) upper-roman; lower-alpha; upper-alpha;

位置list-style-position: outside;(外) inside;

图像list-style-image: url(..);

定位属性： (Position)

Position: absolute; relative; static;

visibility: inherit; visible; hidden;

overflow: visible; hidden; scroll; auto;

clip: rect(12px,auto,12px,auto) (裁切)
```
#### 选择器详解
##### 常见选择器和扩展选择器

###### <font color=#A2B20F>三种基本的选择器类型</font>
- 标签名选择器，如：p{}，即直接使用HTML标签作为选择器。
- 类选择器，如.polaris{}。
- ID选择器，如#polaris{}。

###### <font color=#A2B20F>扩展选择器</font>
- 后代选择器，如.polaris span img{}，后代选贼器实际上是使用多个选择器加上中间的空格来找到具体的要控制标签。
- 群组选择器，如div,span,img{}，群组选择器实际上是对CSS的一种简化写法，只不过把有相同定义的不同选择器放在一起，省了很多代码。

 CSS选择器优先级的结论是：!important>行内样式优先级>id选择器优先级 > 类class选择器优先级 > 标签选择器优先级

<font color=#A2B20F>选择器推荐写法</font>

<p>尽量少使用层级关系</p>

  ```css
    /*一般写法：*/
    #divBox p .red{color:red;}
    /*更好写法：*/
    .red{..}
  ```
<p>使用class代替层级关系</p>

  ```css
    /*一般写法：*/
    #divBox ul li a{display:block;}
    /*更好写法：*/
    .block{display:block;}
  ```
