var cars=[
     {
     	id:0,
     	carName:'奔驰',
     	carType:'XXXX',
     	price:'130万',
     	img:'images/01.jpg',
        show:true
     },
     {
     	id:1,
     	carName:'宝马',
     	carType:'XXXX',
     	price:'56万',
     	img:'images/01.jpg',
        show:true
     },
     {
     	id:2,
     	carName:'迈巴赫',
     	carType:'XXXX',
     	price:'1300万',
     	img:'images/01.jpg',
        show:true
     }

];

var carapp = angular.module('carApp', ['ngRoute']);

    carapp.config(['$routeProvider',function($routeProvider) {
    	$routeProvider
    	.when('/',{
            templateUrl:'view/index.html'
    	})
    	.when('/view/:id',{
    		controller:editCtrl,
    		templateUrl:'view/edit.html'
    	})
        .when('/add', {
            controller:addCtrl,
            templateUrl:'view/add.html'
        })
    	
    	
    }]);
    carapp.controller('carCtrl', function($scope,$http,$routeParams){
    	// $http.get("http://110.173.16.119:8080/productFinder/car/carList ")
    	//      .success(function(response){
     //             $scope.infos = response;
     //             console.log(response);
    	//      });
    	$scope.infos = getCars(cars);

        $scope.delete = function(id){
            for(var i = 0;i < cars.length;i++){
                if(id == cars[i].id){
                    cars[i].show = false;
                }
            }
            $scope.infos = getCars(cars);
            // console.log($scope.infos)
        };
            
	    $scope.safeApply = function(fn){
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        }

        //接收父子级之间的事件与数据
        $scope.$on('to-parent', function(event,data) {
            // console.log('ParentCtrl', event, data);       //父级能得到值
            $scope.infos = data;
        });

        //方法调用更新父级作用域
        // $scope.updateScope = function(list){
        //     $scope.infos = list;
        //     console.log($scope.infos);
        // }

    });

     function editCtrl($scope,$routeParams, $http){
		// $scope.car=cars[$routeParams.id];
        $scope.car= angular.copy(cars[$routeParams.id]);
				
        $scope.edit = function(event){
            var r = confirm("确认修改？");
            if(r){
                // $http.post('http://112.74.108.243:8080/app/car/edit', $scope.car).success(function(res){
                //     console.log(res);
                // }).error(function(e){
                //     console.log(e)
                // })
                cars[$scope.car.id].carName = $scope.car.carName;
                cars[$scope.car.id].carType = $scope.car.carType;
                cars[$scope.car.id].price = $scope.car.price;
                event.target.href='#/';
            }else{
                alert("修改失败！")
                console.log($scope.car)
            }
             
        };
	};

    function addCtrl($scope){
        $scope.car = {};

        $scope.add = function(event){
            $scope.car.id = getMaxId(cars);
            $scope.car.img = 'images/01.jpg';
            $scope.car.show = true;

            var r = confirm("确认添加？");
            if(r){
                cars[$scope.car.id] = $scope.car;
                event.target.href='#/';
                $scope.infos = getCars(cars);
                $scope.$emit('to-parent', $scope.infos);//事件与数据传播 $emit 对应父级$on
                // $scope.updateScope($scope.infos);//方法调用
            }else{
                alert("添加失败！")
                console.log($scope.car)
            }
        };
    }

//show值为true的数据存到数组中
function getCars(cars){
    var arr = [];
    for(var i in cars){
        if(cars[i].show){
            arr.push(cars[i])
        }
    }
    return arr;
}

//遍历数据中的id值，返回max+1 作为新加的id值
function getMaxId(cars){
    var maxId = 0;
    for(var i in cars){
        maxId<=cars[i].id?maxId=cars[i].id:maxId;
    }
    return maxId+1;
}

