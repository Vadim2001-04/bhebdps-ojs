function cachingDecoratorNew(func) {
    let cache = 
    function wrapper(...args) {
        const hash = args.join(',');
        let idx = cache.findIndex((item) => item.hash == hash);
        if (idx !== -1) {
            console.log("Из кэша: " + cache[idx].value);
            return "Из кэша: " + cache[idx].value;
        }
        let result = func(...args);
        cache.push({ 'hash': hash, 'value': result });
        if (cache.length > 5) {
            cache.shift();
        }
        console.log("Вычисляем: " + result);
        return "Вычисляем: " + result;
    }
    return wrapper;
}


function debounceDecoratorNew(func, delay) {
  let timeoutId;
  let hasCalled = false;
  function doIt(args) {
    // Убираем дубликат кода
    func.apply(this, args);
    hasCalled = true;
    wrapper.count++;
  }
  function wrapper(...args) {
    if (timeoutId) clearTimeout(timeoutId);
    if (!wrapper.count) wrapper.count = 0;
    if (!wrapper.allCount) wrapper.allCount = 0;
    if (!hasCalled) {
      doIt(args);
    } else {
      if (!hasCalled) {
        doIt(args);
      } else {
        wrapper.allCount++;
        timeoutId = setTimeout(() => doIt(args), delay);
      }
    }
  }
  wrapper.count = count;
  wrapper.allCount = allCount;
  return wrapper;
}
