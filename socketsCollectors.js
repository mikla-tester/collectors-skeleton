function sockets(io, socket, data) {
    socket.on('setupCollectors', function(d) {
      data.createRoom(d.roomId, d.playerCount, d.lang);
    })
    socket.on('collectorsLoaded', function(d) {
      socket.join(d.roomId);
      data.joinGame(d.roomId, d.playerId);
      socket.emit('collectorsInitialize',
        { labels: data.getUILabels(d.roomId),
          hand: data.getCards(d.roomId, d.playerId) });
    });
    socket.on('collectorsDrawCard', function(d) {
      io.to(d.roomId).emit('collectorsCardDrawn', 
        { playerId: d.playerId,
          cards: data.drawCard(d.roomId, d.playerId) });
    });
}

module.exports = sockets;