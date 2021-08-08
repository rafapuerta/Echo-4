module.exports = {
    commands: ['move', 'mv'],
    expectedArgs: '<ID mensaje> <#canal de destino>',
    permissionError: 'Necesitas permiso de administrador para utilizar este comando',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text, client) => {
        var target_message = '';

        if (arguments[0].search(/^(https:\/\/discord.com\/channels\/)/) >= 0) {
            // The target is given by url
            target_message = args[1].substring(args[1].lastIndexOf('/') + 1);
        } else {
            // assume a message id is given
            target_message = arguments[0];
        }

        message.channel.messages.fetch(target_message).then(msg => {
                        
            target_channel = client.channels.resolve(
                arguments[1].replace(/<#/, '')
                        .replace(/>/, '')
                        );

            if (!target_channel) {
                message.channel.send('El Canal de destino no existe');
                usage(message.channel);
                return;
            }

            var mvstr = '<@' + msg.member + '> en <#' + message.channel + '> 🕒 ';
            mvstr += message.createdAt.toLocaleString('es-ES') + '\n';
            mvstr += (arguments[2] == null) ? '' : '*\"' + message.content.split('\"', 2)[1] + '\"*';
            mvstr += '➡️ por <@' + message.member + '>\n\n';
            var embeds = [];
            var attachments = [];

            
            if (msg.embeds.length > 0) {

                msg.embeds.forEach( element => {

                    embeds.push(element);

                }, err => {
                    console.log(err);
                });    

            } else {

                if (msg.attachments.size > 0) {

                    msg.attachments.each(a => {
                        attachments.push(a.proxyURL);
                    });
                }  
            }

            target_channel.send(msg.content == '' ? mvstr :  mvstr + '>>> ' + msg.content, {
                files: attachments,
                embeds: embeds
            });

           msg.delete(); // delete message to be moved.
           message.delete(); // delete invoking message

        }, () => {
            message.channel.send('No he sido capaz de encontrar el mensaje que quieres mover. Asegúrate de tener la ID correcta.');
        });
    },
    
    
    requiredRoles: ['Vanguardia']
}

