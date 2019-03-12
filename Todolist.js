function addThings() {
    var Athing={
        content:"",
        condition:false
    };
    document.getElementById("Input").value=document.getElementById("Input").value.trim();
    var real=document.getElementById("Input").value.trim();
    if (real.length===0){
        alert("待办事项不能为空！");
    }
    else {
        Athing.content=real;
        todolist.push(Athing);
        saveData(todolist);
    }
    document.getElementById("Input").value="";
    load();
}
function load() {
    var todo=document.getElementById("todolist"),
        done=document.getElementById("donelist"),
        tcount=document.getElementById("todocount"),
        dcount=document.getElementById("donelist"),
        tstring="",
        dstring="",
        todoCount = "",
        doneCount = "";
    document.getElementById("Input").focus();
    todolist = loadData();

    if(todolist!=null){
        for(var i=0; i<todolist.length; i++){
            if(!todolist[i].condition){
                tstring+="<li>"
                    + "<input type='checkbox' onchange='update("+i+",\"condition\", true)'>"
                    + "<p id='p-"+i+"' onclick='edit("+i+")'>" + todolist[i].content + "</p>" +
                    "<a onclick='remove("+i+")'>移除此事件</a>" +
                    "</li>";
                tcount ++;
            }else {
                dstring+="<li>"
                    + "<input type='checkbox' "
                    + "onchange='update("+i+", \"condition\", false)' checked>"
                    + "<p id='p-"+i+"' onclick='edit("+i+")'>" + todolist[i].content + "</p>"
                    + "<a onclick='remove("+i+")'>移除此事件</a>"
                    + "</li>";
                dcount ++;
            }
        }
        todo.innerHTML=tstring;
        done.innerHTML=dstring;
        tcount.innerHTML=todoCount;
        dcount.innerHTML=doneCount;
    }
    else{
        todo.innerHTML = "";
        done.innerHTML = "";
        tcount.innerHTML = "";
        dcount.innerHTML = "";
    }
}
function edit(i) {
    var row=document.getElementById('p-'+i),
        rowcontent=row.innerHTML,
        instead;
    function confirm() {
        if(instead.value.length===0){
            alert("修改后的事项不能为空！");
        }else {
            update(i,"content",instead.value);
        }
    }
    function enter(i) {
        if(i.keyCode===13){
            confirm();
        }
    }
    row.innerHTML = "<input type='text' id='input-"+i+"' value='"+rowcontent+"'>";
    instead = document.getElementById('input-'+i);
    instead.focus();
    instead.setSelectionRange(0, instead.value.length);
    instead.onblur = confirm;
    instead.onkeypress = enter;
}
function update(i, field, value) {
    todolist[i][field] = value;
    saveData(todolist);
    load();
}
function remove(i) {
    todolist.splice(i, 1);
    saveData(todolist);
    load();
}
function saveData(data) {
    localStorage.setItem("Todolist", JSON.stringify(data));
}
function loadData() {
    var hisTory = localStorage.getItem("Todolist");
    if(hisTory !=null){
        return JSON.parse(hisTory);
    }
    else { return []; }
}
function clear() {
    localStorage.clear();
    load();
}
window.addEventListener("load", load);
document.getElementById("clearbutton").onclick = clear;
document.getElementById("Input").onkeypress = function (event) {
    if(event.keyCode === 13){
        addThings();
    }
};