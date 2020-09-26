$(function(){
    // 刚开始就应该处于加载状态
    load();
    // 1、设置当按下回车键的时候
    $('#input_1').on('keydown',function(event){
        if(event.keyCode==13){
           if($(this).val()==''){
               alert('请输入内容');
           }else{
                // 取出数据
                var data=getData('todolist');
                // 添加数据
                var data_ele={
                    title:$('#input_1').val(),
                    done:false,
                }
                data.push(data_ele);
                    // 保存数据
                saveData(data);
                    // 加载数据
                load();
           }
        }
    })
    // 删除数据
    $('ul,ol').on('click','a',function(){
        // 查找数据，根据下标
        var index=$(this).attr("id");
        var data=getData('todolist');
        // 删除数据
        data.splice(index,1);
        // 保存数据
        saveData(data);
        // 加载页面
        load();
    })
    // 数据分类
    $('ul,ol').on('click','input',function(){
        // 取出数据
        var data=getData('todolist');
        var index=$(this).siblings('a').attr('id');
        // 赋值操作
        data[index].done=$(this).prop('checked');
        // 保存数据
        saveData(data);
        // 加载页面
        load();
    })
    // 当点击clear时，清空所有数据
    $('.footer a').on('click',function(){
        localStorage.setItem('todolist','[]');
        load();
    })
    // 取出数据
    function getData(ele){  
        var data=localStorage.getItem(ele);
        if(data!=null){
            return JSON.parse(data);
        }else{
            return [];
        }
    }
    // 保存数据函数
    function saveData(data){
        localStorage.setItem('todolist',JSON.stringify(data));
    }
    // 加载数据函数
    function load(){
        var working=0;
        var worked=0;
        $('ul,ol').html('');
        $('.span_2').html(worked);
        $('.span_1').html(working);
        var temp=getData('todolist');
        $.each(temp,function(index,ele){
            if(ele.done){
                $('ol').prepend("<li><input type='checkbox' checked='checked'/><p>"+ele.title+"</p><a href='javascript:;' id="+index+">×</a></li>")
                worked++;
                $('.span_2').html(worked);
            }else{
                $('ul').prepend("<li><input type='checkbox'/><p>"+ele.title+"</p><a href='javascript:;' id="+index+">×</a></li>")
                working++;
                $('.span_1').html(working);
            }
        })
        $('#input_1').val('');
    }
})
