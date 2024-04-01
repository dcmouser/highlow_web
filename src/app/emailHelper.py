# Helper module to handle emailing functions

# user modules
from lib.logger import jrprint


def sendEmail(emailHeaders, emailText):
    jrprint('In sendEmail..')
    jrprint(emailHeaders)
    jrprint(emailText)
    return True

