module.exports = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

  <head>
    <meta
      http-equiv="Content-Type"
      content="text/html; charset=UTF-8"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />

    <style type="text/css">
      img {
        max-width: 600px;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      a {
        text-decoration: none;
        border: 0;
        outline: none;
        color: #bbbbbb;
      }

      a img {
        border: none;
      }

      td,
      h1,
      h2,
      h3 {
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 400;
      }

      td {
        text-align: center;
      }

      body {
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;
        width: 100%;
        height: 100%;
        color: #000000;
        background: #ffffff;
        font-size: 16px;
      }

      table {
        border-collapse: collapse !important;
      }
    </style>

    <style
      type="text/css"
      media="only screen and (max-width: 480px)"
    >
      @media only screen and (max-width: 480px) {
        table[class="w320"] {
          width: 320px !important;
        }
      }
    </style>
  </head>

  <body
    class="body"
    style="padding:0; margin:0; display:block; background:#cccccc; -webkit-text-size-adjust:none"
    bgcolor="#ffffff"
  >
    <table
      align="center"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      height="100%"
    >
      <tr>
        <br>
        <td
          align="center"
          valign="top"
          bgcolor="#cccccc"
          width="100%"
        >
          <center>
            <table
              style="margin: 0 auto;"
              cellpadding="0"
              cellspacing="0"
              width="600"
              class="w320"
              bgcolor="#ffffff"
            >

              <tr>
                <td>
                  <br>
                  <img
                    src="https://static.thenounproject.com/png/192825-200.png"
                    width="150"
                    height="150"
                    alt="setting image"
                  >
                </td>
              </tr>
              <tr>
                <td>

                  <center>
                    <table
                      style="margin: 0 auto;"
                      cellpadding="0"
                      cellspacing="0"
                      width="90%"
                    >
                      <tr>
                        <td>
                          <br>
                          We heard that you lost your Duel password. Sorry about that!
                          <br>
                          <br>
                          But don’t worry! You can use the following link to reset your
                          password:
                          <br>
                          <br>
                        </td>
                      </tr>
                    </table>
                  </center>

                </td>
              </tr>
              <tr>
                <td>
                  <br>
                  <div>
                    <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="8%" stroke="f" fillcolor="#178f8f">
                          <w:anchorlock/>
                          <center>
                        <![endif]-->
                    <a
                      href="{{ data.link }}"
                      style="background-color:#178f8f;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;"
                    >Reset password</a>
                    <!--[if mso]>
                          </center>
                        </v:roundrect>
                      <![endif]-->
                  </div>
                  <br>

                  <center>
                    <table
                      style="margin: 0 auto;"
                      cellpadding="0"
                      cellspacing="0"
                      width="90%"
                    >
                      <tr>
                        <td style="color:#000000;">
                          <br>
                          If you don’t use this link within 6 hours, it will expire. To get a
                          new
                          password reset link, visit <a
                            style="color:#187272;"
                            href="http://"
                          >password reset</a>
                        </td>
                      </tr>
                    </table>
                  </center>


                  <br>
                  <br>
                </td>
              </tr>

            </table>
          </center>
        </td>
      </tr>
    </table>
  </body>

</html>
`;