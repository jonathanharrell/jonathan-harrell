const axios = require('axios')

exports.handler = async (event) => {
  const params = JSON.parse(event.body)
  const email = params.email

  try {
    const { data } = await axios({
      method: 'post',
      url: `https://${process.env.MAILCHIMP_REGION}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
      auth: {
        username: 'harr041',
        password: process.env.MAILCHIMP_API_KEY
      },
      data: {
        email_address: `${email}`,
        status: 'subscribed'
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify(error.response.data)
    }
  }
}
