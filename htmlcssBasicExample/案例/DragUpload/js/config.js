require.config({
	baseUrl: './js',
	paths: {
		'jquery': 'http://cdn.bootcss.com/jquery/1.11.1/jquery.min',
		'upload': 'upload'
	}
});

require( ['upload'], function( upload ){
	upload.init({
		url: './upload.php',
		fromName: 'files',
		filePath: '/wordpress',
		otherParam: {
			typeId: 'aabb',
			typeName: 'ccdd'
		},
		init: function( files ){
			/** 
			var Reg = new RegExp( /image\/\w+/ );
			for ( var i=0; i < files.length; i++ ){
				
				if( (files[i].size / 1024 ) > 512 ){
					alert('文件大小不能超过 512KB');
					return false;
				}

				if ( Reg.test( files[i].type ) ){
					return true;
				} else {
					alert('只能上传图片文件');
					return false;
				}
			} 
			*/
		},
		success: function( data ){
			if ( data.msg > 0 ){
				window.console && console.log( data, '上传成功');
			} else {
				alert('上传出错');
			}
		},
		error: function(){
			window.console && console.log('上传失败');
		}
	});
});