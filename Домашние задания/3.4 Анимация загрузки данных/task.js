const code = document.createElement('div');
code.classList.add('item__code');
code.textContent = currency;

const value = document.createElement('div');
value.classList.add('item__value');
value.textContent = currencies[currency].Value;

const currencyName = document.createElement('div');
currencyName.classList.add('item__currency');
currencyName.textContent = currencies[currency].Name;

item.appendChild(code);
item.appendChild(value);
item.appendChild(currencyName);

itemsElement.appendChild(item);
