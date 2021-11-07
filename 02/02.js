
var data = [
    {
        name:"Windows程序设计",
        teacher:"赵卫中",
        week:1,           //week 1表示全部，2表示单周，3表示双周
        time:"w1_j1",
        location:"n217",
        source:2.5,
    },
    {
        name:"Windows程序设计",
        teacher:"赵卫中",
        week : 3,
        time:"w3_j7",
        location:"n217",
        source:2.5,
    },
    {
        name:"微机原理与接口技术",
        teacher:"金汉均",
        week : 1,
        time:"w1_j3",
        location:"n113",
        source:3.0,
    },
    {
        name:"微机原理与接口技术",
        teacher:"金汉均",
        week : 2,
        time:"w3_j7",
        location:"n113",
        source:3.0,
    },
    {
        name:"机器人技术与应用",
        teacher:"彭熙",
        week : 1,
        time:"w1_j9",
        location:"n520",
        source:2.0,
    },
    {
        name:"Web程序设计",
        teacher:"涂新辉",
        week : 3,
        time:"w2_j1",
        location:"n108",
        source:2.5,
    },
    {
        name:"Web程序设计",
        teacher:"涂新辉",
        week : 1,
        time:"w4_j5",
        location:"n108",
        source:2.5,
    },
    {
        name:"信息检索",
        teacher:"张茂元",
        week : 1,
        time:"w2_j7",
        location:"n108",
        source:2.5,
    },
    {
        name:"信息检索",
        teacher:"张茂元",
        week : 3,
        time:"w4_j1",
        location:"n528",    
        source:2.5,
    },
    {
        name:"人工智能",
        teacher:"张连发",
        week : 1,
        time:"w3_j1",
        location:"n520",  
        source:2.0,
    },
    {
        name:"操作系统",
        teacher:"叶俊民",
        week : 1,
        time:"w3_j3",
        location:"n108",  
        source:4.0,
    },
    {
        name:"操作系统",
        teacher:"叶俊民",
        week : 1,
        time:"w5_j1",
        location:"n108",  
        source:4.0,
    },
    {
        name:"习近平新时代中国特色社会主义思想概论",
        teacher:"吕惠东",
        week : 1,
        time:"w4_j3",
        location:"n223", 
        source:2.0,
    }
];
var color = ["LightGreen","yellow","CornflowerBlue","Tan","SeaGreen"];
//利用js的jQuery动态生成html代码，创建基本的课程表
function createTable(idName) {
    var div_ = $("#" + idName);    //定位上层节点div
    //div_.css("margin","30px auto");//表格居中，添加上下边距
    div_.append('<table class="table"></table>');//添加表格
    var table_ = div_.find(".table");
    var tr_;
    for (var i = 0; i <= 10; i++) {
        if (i == 0) {
            //添加周信息
            table_.append('<tr class="headCourse"><th class="th_course"></th><th class="th_course">周一</th><th class="th_course">周二</th><th class="th_course">周三</th><th class="th_course">周四</th><th class="th_course">周五</th><th class="th_course">周六</th><th class="th_course">周天</th></tr >');
            $(".th_course").width(70);
            $(".th_course").height(100);
            
        } else {
            //添加时段信息
            //<tr class="j1"></tr>
            table_.append('<tr class="j' + i + '"></tr>');
            tr_ = table_.find(".j" + i);
            //<th>1</th>
            tr_.append('<th class="th_course">' + i + '</th>');
            if(i%2=== 1){
                for (var j = 1; j <= 7; j++) {
                    //<td id="w1_j1"></td>
                    tr_.append('<td rowspan="2" valign="top" id="w' + j + '_j' + i + '" class="td_course"></td>');
                }
            }
            //修改每一个课表的td节点的大小
            $(".th_course").width(70);
            $(".th_course").height(50);
        }
    }
}

//将data中的多余的数据去除
function getdata(week){
    var handledata = [];
    //处理week参数，
    if(week % 2 === 1){
        week = 2;
    }
    else{
        week = 3;
    }
    for(var i = 0 ; i< data.length;i++){
        if(data[i].week !== 1 && data[i].week !== week){  
        }
        else{
            handledata.push(data[i]);
        }
    
    }
    return handledata;
}

//鼠标接触（参考函数）
function output(course){
    var intro = $("div.introduction");//找到显示的div
    intro.css("font-size","30px");   //设置字体大小
    intro.css("line-height", "80px"); //设置字体间隔
    intro.html("课程："+course.name+"<br>教师："+course.teacher+"<br>时间：周"+course.time[1]+course.time[4]+"-"+(course.time[4]+1)+"节<br>地点："+course.location+"<br>学分："+course.source);
}
//鼠标删除(参考函数)
function deleteDiv(){
    var intro = $("div.introduction");//找到显示的div
    intro.html("");
}

function createTableByData(){
    var week = $("#textId").val();
    var number = parseInt(week);
    //week输入只能为1-19；
    //利用这个则表达式来判断读取的字符串是否为整数。
    if(!(/^[-]?[\.\d]+$/.test(week))){
        alert("只能输入整数！");
        return ;
    }
    else{
        if(number < 1 || number > 19){
            alert("上课时间只有1-19周！");
            return ;
        }

        //清空上一次的数据
        for(var i = 0 ; i < 7;i++){
            for(var j = 1 ; j < 10 ; j=j+2){
                var t = $("td#w"+i+"_j"+j);
                t.html("");
                t.css("backgroundColor","white");//还原背景yanse
            }
        }
        //设置表头
        if(document.getElementById("week")){
            $("th#week").text('第'+week+'周');
        }
        else{
            //如果是第一次则创建表头
            $("table.table").prepend('<tr class="week"><th></th><th></th><th></th><th colspan="3" id="week">第'+week+'周</th><th></th><th></th><th></th></tr >');
            $("th#week").css("font-size","30px");//表头大小
        }
        

        //获取处理后的数据
        var dataGet = getdata(number);

        for(var i = 0 ; i < dataGet.length ;i++){
            var t = $("td#"+dataGet[i].time);
            t.text(dataGet[i].name);//设置文本
            var c = color[parseInt(dataGet[i].time[1])-1];
            t.css("backgroundColor",c);//设置背景颜色
            t.css("border-radius", 10); //设置圆角
            //绑定鼠标移入
            t.mouseenter(
                dataGet[i],function(event){
                    var course = event.data;
                    var intro = $("div.introduction");//找到显示的div
                    intro.css("font-size","30px");   //设置字体大小
                    intro.css("line-height", "80px"); //设置字体间隔
                    intro.html("课程："+course.name+"<br>教师："+course.teacher+"<br>时间：周"+course.time[1]+course.time[4]+"-"+(course.time[4]+1)+"节<br>地点："+course.location+"<br>学分："+course.source);
                },
            );
            //绑定鼠标移出
            t.mouseleave(
                function(){
                    var intro = $("div.introduction");//找到显示的div
                    intro.html("");
                }
            );  
        }
    }
    //bond();
    
}