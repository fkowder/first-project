let foods = [
    {
        id: "01",
        name:"Chicken Burger",
        src:"Chicken_Burger.png",
        price:"12.00",
        ratting: 2
    },
    {
        id: "02",
        name:"Chicken Cheese Pizza",
        src:"Chicken_Cheese_Pizza.png",
        price:"12.00",
        ratting: 3
    },
    {
        id: "03",
        name:"Chicken Fry",
        src:"Chicken_Fry.png",
        price:"12.00",
        ratting: 2
    },
    {
        id: "04",
        name:"Chicken Sandwich",
        src:"Chicken_Sandwich.png",
        price:"30.00",
        ratting: 5
    },
    {
        id:"05",
        name:"Fry_Nurger",
        src:"Fry_Nurger.png",
        price:"40.00",
        ratting: 3
    },
    {
        id:"06",
        name:"Grill_Chicken",
        src:"Grill_Chicken.png",
        price:"50.00",
        ratting: 3
    },
    {
        id: "07",
        name:"Spaghetti",
        src:"Spaghetti.png",
        price:"60.00",
        ratting: 3
    },
    {
        id:"08",
        name:"Seekh_Kebab",
        src:"Seekh_Kebab.png",
        price:"70.00",
        ratting: 3
    },
    {
        id: "09",
        name:"Pasta",
        src:"Pasta.png",
        price:"80.00",
        ratting: 3
    },
    {
        id: 10,
        name:"BurgerBlast 1",
        src:"BurgerBlast 1.png",
        price:"90.00",
        ratting: 3
    },
    {
        id: 11,
        name:"TacoTopia 1",
        src:"TacoTopia 1.png",
        price:"100.00",
        ratting: 3
    },
    {
        id:12 ,
        name:"Chicken_Cheese_Pizza",
        src:"Chicken_Cheese_Pizza.png",
        price:"120.00",
        ratting: 3
    }
]

let activeOnCartItems = [];
// funtion init...
foodsectionHandler();
collectCartDataHandler();
cartStatusHandler();
activeItemsRowHandler();
incrementHandler();
decrementHandler();
clearHandler();

// foodsectionHandler;
function foodsectionHandler (){
    let rowdiv = document.getElementById('row-div');
    let foodItem = function(item){
        return `<div class="col-lg-3">
        <div class="food-item">
            <img src="assets/images/${item.src}" alt="">
            <div class="info">
                <span>${item.name}</span>
                <div class="price-area">
                    <div class="ratting">
                        ${rattinghandler(item.ratting)}
                    </div>
                    <div class="price">
                        <span>$${item.price}</span>
                    </div>
                </div>
                <div class="btn-area">
                    <a data-id="${item.id}" class="add-to-cart-btn Added" href="#">Add to cart</a>
                </div>
            </div>
        </div>
    </div>`;
    }
    let output = foods.map(function(item){
        return foodItem(item);
    })
    rowdiv.innerHTML = output.join('');

    function rattinghandler (n){
        let output = [];
        for(let i = 1; i <= 5; i++){
            output.push(`<i class="fa-solid ${n >= i && 'active'} fa-star" ></i>`)
        }
        return output.join('')
    }
}

let cartDataId;
function collectCartDataHandler (){
    let atags = document.querySelectorAll('.add-to-cart-btn')
    atags.forEach(function(atag){
        atag.addEventListener('click',function(e){
            e.preventDefault();
            cartDataId = e.target.getAttribute('data-id')
            // console.log(cartDataId);
            // push data to cart variable
            let activeData = foods.find(function(item){
                return item.id == cartDataId;
            });

            if (!activeOnCartItems.includes(activeData))
            activeData.total_count = 1;
            activeOnCartItems.push(activeData)

            cartStatusHandler(activeOnCartItems.length)

            let dataIds = activeOnCartItems.map(function(item){
                return item.id
            })
            btnStatusChangeHandler(activeOnCartItems);
            activeItemsRowHandler(activeOnCartItems);
            deleteActiveItem();
        });
    });
};

function cartStatusHandler (count = 0){
    let cartStatus = document.getElementById('cartstatus')
    cartStatus.innerHTML = count
}
// btn status change on click
function btnStatusChangeHandler (totalActiveData){
    // let atag = document.querySelector(`[data-id="${cartDataId}"]`)
    // atag.classList.add('added')
    // dataIds.forEach(function(item){
        // let atag = document.querySelector(`[data-id="${item}"]`)
        // atag.classList.add('added')

        let allDataIdtags = document.querySelectorAll(('.add-to-cart-btn'))
        allDataIdtags.forEach(function(atag){
            atag.classList.remove('added')
        })
        // Array.from(allDataIdtags).map(function(atag){
        //     atag.classList.remove('added');
        // })
        totalActiveData.map(function(item){
            let atag = document.querySelector(`[data-id="${item.id}"]`)
            atag.classList.add('added');
        })
}
// push data to popop
function activeItemsRowHandler (){
    let tableBody = document.getElementById('table-body')
    let tableRow = function(id,name,src,price,total_count){
        return ` <tr>
                <th><img src="assets/images/${src}" alt=""></th>
                <td>
                    <span>${name}</span>
                </td>
                <td>
                    <span>$${price}</span>
                </td>
                <td>
                    <div class="amount-area">
                        <span class="amount">${total_count}</span>
                        <span class="plus">
                            <i data-id="${id}" class="fa-solid fa-plus increment-btn"></i>
                        </span>
                        <span class="minus ">
                            <i data-id="${id}" class="fa-solid fa-minus decrement-btn"></i>
                        </span>
                    </div>
                </td>
                <td>
                    <span>$${(price * total_count).toFixed(2)}</span>
                </td>
                <td>
                <div class="action">
                    <i data-id="${id}" class="fa-solid fa-trash active-item-delete-btn"></i>
                </div>
                </td>
                </tr>`
    };

    let finalOutput = activeOnCartItems.map(function(item){
        return tableRow(item.id, item.name, item.src,item.price,item.total_count)
    })
    // No Data Found
    if (activeOnCartItems.length == 0){
        tableBody.innerHTML = `<tr>
                                    <td colspan="6" >
                                    <p class="p-2 text-center mb-0">No Data Found😒😒</p>
                                    </td>
                                </tr>`
    } else{
        tableBody.innerHTML = finalOutput.join(' ');}
  
    // total amount
    let finaltotal = activeOnCartItems.map(function(item){
        return item.price*item.total_count
    })

    finaltotal = finaltotal.reduce(function(total,n){
        return total + n ;
    }, 0)
    console.log(finaltotal);
    let totalAmount =   document.getElementById('total-amount')
    totalAmount.innerHTML = finaltotal.toFixed(2)
}

// delete active item
function deleteActiveItem (){
    // let deleteButtons = document.querySelectorAll('.active-item-delete-btn')
    let tableBody = document.querySelector('#table-body')
    tableBody.addEventListener('click',function(e){
        if(e.target.classList.contains('active-item-delete-btn') == true){   
            let dataId = e.target.getAttribute('data-id')
            // console.log(activeOnCartItems);
            // activeOnCartItems = [];

            // activeOnCartItems = activeOnCartItems.filter(function(item){
            //     return item.id != dataId
            // })

            updatedata = activeOnCartItems.filter(function(item){
                    return item.id != dataId
            })
            activeOnCartItems = updatedata
            btnStatusChangeHandler(activeOnCartItems)
            cartStatusHandler(activeOnCartItems.length)
            activeItemsRowHandler();
        };
    });  
};

function incrementHandler () {
    let tableBody = document.querySelector('#table-body')
    tableBody.addEventListener('click',function(e){
            let check = e.target.classList.contains('increment-btn')
            if (check){
            let dataId = e.target.getAttribute('data-id')
            let updateactiveOnCartItems = activeOnCartItems.map(function(item){
                if  (item.id == dataId){
                    item.total_count = item.total_count < 20 ? item.total_count + 1: 20;
                }
                return item
            });
            activeOnCartItems = updateactiveOnCartItems;
            activeItemsRowHandler();
        };
    }); 
};

function decrementHandler () {
    let tableBody = document.querySelector('#table-body')
    tableBody.addEventListener('click',function(e){
            e.preventDefault();
            let check = e.target.classList.contains('decrement-btn')
            if (check){
            let dataId = e.target.getAttribute('data-id')
            let updateactiveOnCartItems = activeOnCartItems.map(function(item){
                if  (item.id == dataId){
                    item.total_count = item.total_count > 1 ? item.total_count - 1: 1;
                }
                return item
            });
            activeOnCartItems = updateactiveOnCartItems;
            activeItemsRowHandler();
        }
    }); 
};

function clearHandler (){
    let clear = document.getElementById('clear-btn')
    clear.addEventListener('click',function(e){
        e.preventDefault();
        activeOnCartItems = [];
        activeItemsRowHandler();
        btnStatusChangeHandler(activeOnCartItems)
        activeOnCartItems.length = 0;
        cartStatusHandler(activeOnCartItems.length);
    })
}



