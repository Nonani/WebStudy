module.exports = {
    HTML:function(title, body){
      return `
      <!doctype html>
      <html>
      <head>
        <title>NoticeProject - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        ${body}
      </body>
      </html>
      `;
    }
  }