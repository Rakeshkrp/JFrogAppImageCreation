"use strict";
var KTDatatablesDataSourceHtml = function() {

	var dataJSONArray = JSON.parse(
		'[[1,"54473-251","GT","San Pedro Ayampuc","Sanford-Halvorson","897 Magdeline Park","sgormally0@dot.gov","Shandra Gormally","Eichmann, Upton and Homenick","GTQ","sit amet cursus id turpis integer aliquet massa id lobortis convallis","Computers","house.gov","14.78667","-90.45111","5/21/2016","America/Guatemala",1,2],[2,"41250-308","ID","Langensari","Denesik-Langosh","9 Brickson Park Junction","eivanonko1@over-blog.com","Estele Ivanonko","Lowe, Batz and Purdy","IDR","lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet","Baby","arizona.edu","-6.4222","105.9425","4/19/2016","Asia/Jakarta",1,3],[3,"0615-7571","HR","Slatina","Kunze, Schneider and Cronin","35712 Sundown Parkway","sbettley2@gmpg.org","Stephine Bettley","Bernier, Weimann and Wuckert","HRK","cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus","Toys","rakuten.co.jp","45.70333","17.70278","4/7/2016","Europe/Zagreb",6,3]]');

	var initTable1 = function() {
		var table = $('#kt_datatable');

		// begin first table
		table.DataTable({
			responsive: true,
			data: dataJSONArray,
			columnDefs: [
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
					render: function(data, type, full, meta) {
						return '\
							<div class="d-flex align-items-center">\
								<div class="dropdown dropdown-inline mr-1">\
									<a href="javascript:;" class="btn btn-sm btn-clean btn-icon" data-toggle="dropdown">\
										<i class="la la-cog"></i>\
									</a>\
									<div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
										<ul class="nav nav-hoverable flex-column">\
											<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-edit"></i><span class="nav-text">Edit Details</span></a></li>\
											<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-leaf"></i><span class="nav-text">Update Status</span></a></li>\
											<li class="nav-item"><a class="nav-link" href="#"><i class="nav-icon la la-print"></i><span class="nav-text">Print</span></a></li>\
										</ul>\
									</div>\
								</div>\
								<a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-1" title="Edit details">\
									<i class="la la-edit"></i>\
								</a>\
								<a href="javascript:;" class="btn btn-sm btn-clean btn-icon" title="Delete">\
									<i class="la la-trash"></i>\
								</a>\
							</div>\
						';
					},
				},
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

jQuery(document).ready(function() {
    console.log(JSON.parse('[[1,"54473-251","GT","San Pedro Ayampuc","Sanford-Halvorson","897 Magdeline Park","sgormally0@dot.gov","Shandra Gormally","Eichmann, Upton and Homenick","GTQ","sit amet cursus id turpis integer aliquet massa id lobortis convallis","Computers","house.gov","14.78667","-90.45111","5/21/2016","America/Guatemala",1,2],[2,"41250-308","ID","Langensari","Denesik-Langosh","9 Brickson Park Junction","eivanonko1@over-blog.com","Estele Ivanonko","Lowe, Batz and Purdy","IDR","lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet","Baby","arizona.edu","-6.4222","105.9425","4/19/2016","Asia/Jakarta",1,3],[3,"0615-7571","HR","Slatina","Kunze, Schneider and Cronin","35712 Sundown Parkway","sbettley2@gmpg.org","Stephine Bettley","Bernier, Weimann and Wuckert","HRK","cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus","Toys","rakuten.co.jp","45.70333","17.70278","4/7/2016","Europe/Zagreb",6,3]]'));    var token = localStorage.getItem('token');
    $.ajax({
        url: 'http://localhost:1337/users',
        type: 'get',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function (response) {
            console.log(JSON.parse(response));
          //  KTDatatablesDataSourceHtml.init();
        },
        error: function (jqXHR, exception) {
           console.log('AJAX ERROR')
        }
    });

	
});
