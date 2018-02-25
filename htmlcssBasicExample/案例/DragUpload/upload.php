<?php
 
    $uploaddir = 'upload/';
    $src_array=array();

    //设置跨越，具体可Google，Baidu， Access-Control-Allow-Origin
    header( 'Access-Control-Allow-Origin: *' );

    //因本地测试，响应较快，所以设置程序休眠1秒才执行
    sleep(1);

    //接受上传
    if(isset($_FILES['files'])){
        foreach ($_FILES['files'] as $key => $error) {
            $tmp_name = $_FILES["files"]["tmp_name"];  
            $name = $_FILES["files"]["name"];
            $name= date("YmdHis",time()).preg_replace("#[^\w\.]#","",$name);
            $uploadfile = $uploaddir.$name;
            $ret=move_uploaded_file($tmp_name, $uploadfile);
            if($ret){
                $src_array=array(
                    'msg' => 1,
                    'file' => array(
                        'fileName' => $name,
                        'fileDir' => $uploadfile
                    )
                );
            }
        }
    }

    echo json_encode($src_array);
?>