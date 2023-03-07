module.exports = {  Ship };


  function Ship(length) {
    const hits = new Array(length).fill(false);
  
    function hit(position) {
      if (position >= 0 && position < length) {
        hits[position] = true;
        return true;
      }
      return false;
    }
  
    function isSunk() {
      return hits.every(hit => hit === true);
    }
  
    return {
      length,
      hits,
      hit,
      isSunk
    };
  }

