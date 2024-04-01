# Helper module to handle Authorization/Authentification functions

# fastapi
# ATTN: why are we importing this from fastapi? (which is actually starlette.templatin) A: see https://www.starlette.io/templates/
from fastapi.templating import Jinja2Templates

# python modules
from pathlib import Path

# user modules
from lib.logger import jrprint
# fapu user modules
from .models import User
from .emailHelper import sendEmail


# templates
BASE_PATH = Path(__file__).resolve().parent.parent
TEMPLATE_PATH = str(BASE_PATH / "templates")
# Jinja2Templates is like a wrapped Jinja2 "Environment", and supports syntax calls to a Jinja2Environment
Templates = Jinja2Templates(directory=TEMPLATE_PATH)



def sendSignupEmailVerificationEmail(user: User):
    jrprint("In sendSignupVerificationEmail")
    jrprint(user)
    # render the template, passing the user details
    template = Templates.get_template("newUserSignupEmailVerification.txt")
    # template dictionary
    siteUrl = "http://localhost:3000/"
    confirmationUrlGeneric = siteUrl + "auth/passwordReset"
    verificationCode = "123"
    confirmationUrlWithVerificationCode = confirmationUrlGeneric + "?code="+verificationCode
    #
    templateDict = {"siteName": "High and Low Web Services", "siteUrl": siteUrl}
    templateDict["user"] = user
    templateDict["userEmail"] = user.email
    templateDict["confirmationUrlWithVerificationCode"] = confirmationUrlWithVerificationCode
    templateDict["confirmationUrlGeneric"] = confirmationUrlGeneric
    templateDict["verificationCode"] = verificationCode
    emailText = template.render(templateDict)
    # build email header
    toEmail = user.email
    subject = "Signup confirmation email from {}".format(templateDict["SiteName"])
    fromEmail = "highlow@donationcoder.com"
    emailHeaders = {"to": toEmail, "from": fromEmail, "subject": subject}
    # send the email
    retv = sendEmail(emailHeaders, emailText)
    jrprint(retv)
