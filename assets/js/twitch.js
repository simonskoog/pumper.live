var client_id = 'nhfimyu99tp77004p89k1kfemcyj59';
var redirect = 'https://www.pumper.live/';

document.getElementById('authorize').setAttribute('href', 'https://id.twitch.tv/oauth2/authorize?client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect) + '&response_type=token')
document.getElementById('access_token').textContent = '';

if (document.location.hash) {
   var parsedHash = new URLSearchParams(window.location.hash.substr(1));
   if (parsedHash.get('access_token')) {
      var access_token = parsedHash.get('access_token');
      document.getElementById('access_token').textContent = 'Your Access Key from the #url: ' + access_token;

      document.getElementById('user_data').textContent = 'Loading';

      // call API
      fetch(
         'https://api.twitch.tv/helix/users',
         {
            "headers": {
               "Client-ID": client_id,
               "Authorization": "Bearer " + access_token
            }
         }
      )
         .then(resp => resp.json())
         .then(resp => {
            document.getElementById('user_data').innerHTML = '<p>Your Public Twitch Profile from Twitch (Features under development):</p>';
            var table = document.createElement('table');
            document.getElementById('user_data').append(table);
            for (var key in resp.data[0]) {
               var tr = document.createElement('tr');
               table.append(tr);
               var td = document.createElement('td');
               td.textContent = key;
               tr.append(td);
               var td = document.createElement('td');
               td.textContent = resp.data[0][key];
               tr.append(td);
            }
         })
         .catch(err => {
            console.log(err);
            document.getElementById('user_data').textContent = 'Something went wrong';
         });
   }
}