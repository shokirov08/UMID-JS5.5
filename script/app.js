let products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

let burgersBtn = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn  = document.querySelector('.wrapper__navbar-btn'),
    cartList = document.querySelector('.wrapper__navbar-basket'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartAmount = document.querySelector('.warapper__navbar-count'),
    cartListItem = document.querySelector('.wrapper__navbar-checklist'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice');

burgersBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        addAmount(btn)
    })
})

cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))

function addAmount(btn) {
    // closest() - позволяет подключиться к указаному ближайшему родителю
    // getAttribute() - берет значение указаного атрибута
    let parent = btn.closest('.wrapper__list-card')
    let id = parent.getAttribute('id')
    products[id].amount++
    basket()
}


function basket() {
    let korzina = []
    for(let key in products) {
        let burger = products[key]
        let productBurger = document.querySelector(`#${key}`)
        let productCount = productBurger.querySelector('.wrapper__list-count')
        if(burger.amount > 0) {
            korzina.push(burger)
            productCount.classList.add('active')
            productCount.innerHTML = burger.amount
        }else {
            productCount.classList.remove('active')
            productCount.innerHTML = ''
        }
    }
    let allAmount  = totalCountBurgers()
    if(allAmount > 0) {
        cartAmount.classList.add('active')
        cartAmount.innerHTML = allAmount
    }else {
        cartAmount.classList.remove('active')
        cartAmount.innerHTML = ''
    }
    
    cartListItem.innerHTML = ''
    
    korzina.forEach((burger) => {
        cartListItem.innerHTML += createBurger(burger)
    })
    
    cartTotalPrice.innerHTML = totalSumBurgers()
    
     
}


function totalSumBurgers () {
    let array = Object.values(products)
    let sum = array.reduce((acc, item) => acc + item.totalSum ,0)
    return sum
}




function totalCountBurgers () {
    let sum = 0
    for(let key in products) {
        sum +=  products[key].amount
    }
    return sum
}


function createBurger (burger) {           
   return `<div class="navbar__item"  id="${burger.name.toLowerCase()}-burger">
   <div class="navbar__item-left">
       <img src="${burger.img}" alt="">
       <div class="navbar__item-left-info">
           <p class="navbar__item-left-name">${burger.name}</p>
           <p class="navbar__item-left-price">${burger.price} сум</p>
       </div>
   </div>
   <div class="navbar__item-right">
       <button data-symbol="-" class="navbar__item-btn">-</button>
       <output class="navbar__item-count">${burger.amount}</output>
       <button data-symbol="+" class="navbar__item-btn">+</button>
   </div>
</div>`
}

window.addEventListener('click', (event) => {
    if(event.target.classList.contains('navbar__item-btn')) {
        let btn = event.target
        let parent = btn.closest('.navbar__item')
        let dataValue = btn.getAttribute('data-symbol')
        if(parent) {
            let id = parent.getAttribute('id').split('-')[0]
            if(dataValue == '+') {
                products[id].amount++
            }else if(dataValue == '-') {
                products[id].amount--
            }
            basket()
        }
    }
})


let title = document.querySelector('.title')

function add() {
    if(title.innerHTML < 100) {
        title.innerHTML++
        setTimeout(() => {
            add()
        }, 30);
    }else {
        title.innerHTML += 'lvl'
        title.style.fontSize ='50px'
    }
}

add()