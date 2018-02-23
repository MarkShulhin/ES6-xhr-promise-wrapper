export default class Ajax {
    get(url) {
        return new Promise(function(resolve, reject) {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open('GET', proxyurl + url);
            xhr.onreadystatechange = function() {
                if (xhr.readyState > 3 && xhr.status === 200) {
                    resolve(xhr.responseText);
                }
                if(xhr.readyState > 3 && xhr.status !== 200) {
                    reject(Error(`${url} failed to load; error code: ${xhr.statusText}`));
                }
            };
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send();
        });
    }
  
    post(url, data) {
        return new Promise(function(resolve, reject) {

            let params = typeof data == 'string' ? data : Object.keys(data).map((k) => {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
            }).join('&');

            let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
            xhr.open('POST', url);
            xhr.onreadystatechange = function() {
                if (xhr.readyState > 3 && xhr.status === 200) {
                    resolve(xhr.responseText);
                } 
                if(xhr.readyState > 3 && xhr.status !== 200) {
                    reject(Error(`${url} failed to load; error code: ${xhr.statusText}`));
                }
            };
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        });
    }
  }