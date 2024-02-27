const fs = require('fs');
db = connect('mongodb+srv://Administrator:LGgAkruelR4aXTWD@cluster0.1wmzwnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  
  const str = 'revenue'
  console.log(str, str.hashCode())