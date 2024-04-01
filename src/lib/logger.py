# python modules
import time
import io
import logging
import os




# ---------------------------------------------------------------------------
# module globals
moduleLogFile = None
moduleErrorPrintCount = 0
# ---------------------------------------------------------------------------





# ---------------------------------------------------------------------------
#
def jrprint(*args, **kwargs):
    # replacement for print function that will allow logging
    global moduleLogFile
    global moduleErrorPrintCount

    # create log file
    if (moduleLogFile is None):
        
        if not os.path.exists("logs"):
            os.makedirs("logs")
        filePath = 'logs/log_' + time.strftime('%Y%m%d_%H%M%S') + '.txt'
        moduleLogFile = open(filePath, 'a+')
        print('>LOGGING TO: {}..'.format(filePath))

    # check for any presence of the word error (this is just for end run reporting, its ok if its not precise)

    textLine = jrSprintf(args,kwargs).upper()
    if ('ERROR' in textLine) or ('EXCEPTION' in textLine):
        moduleErrorPrintCount += 1

    # log
    try:
        print(*args, file=moduleLogFile, **kwargs, flush=True)
    except Exception as e:
        print('EXCEPTION WHILE TRYING TO PRINT TO LOG FILE: {}'.format(e))
        moduleErrorPrintCount += 1
        # invoke normal print
        print(*args, **kwargs, flush=True)
        return

    # invoke normal print
    return print(*args, **kwargs)


def jrlog(*args, **kwargs):
    global moduleLogFile
    global moduleErrorPrintCount

    # create log file
    if (moduleLogFile is None):
        filePath = 'logs/log_' + time.strftime('%Y%m%d_%H%M%S') + '.txt'
        moduleLogFile = open(filePath, 'a+')
        print('>LOGGING TO: {}..'.format(filePath))

    # log
    try:
        print(*args, file=moduleLogFile, **kwargs, flush=True)
    except Exception as e:
        print('EXCEPTION WHILE TRYING TO PRINT TO LOG FILE: {}'.format(e))
        moduleErrorPrintCount += 1
        # invoke normal print
        print(*args, **kwargs, flush=True)
        return






# see https://stackoverflow.com/questions/5309978/sprintf-like-functionality-in-python
def jrSprintf(*args, **kwargs):
    sio = io.StringIO()
    print(*args, **kwargs, file=sio)
    return sio.getvalue()


def getJrPrintErrorCount():
    global moduleErrorPrintCount
    return moduleErrorPrintCount


def jrException(msg):
    textLine = 'EXCEPTION: ' + msg
    jrprint(textLine)
     
# ---------------------------------------------------------------------------
    





# ---------------------------------------------------------------------------
def jrUvicornLoggerSetup():
    class JrLogHandler(logging.StreamHandler):
        def __init__(self )-> None:
            logging.StreamHandler.__init__(self=self)
        def emit(self, record) -> None:
            jrlog(record.getMessage())


    # catch logging from uvicorn
    handler = JrLogHandler()
    handler.setLevel(logging.DEBUG)
    handler.setFormatter(logging.Formatter("UVICORN: %(asctime)s - %(levelname)s - %(message)s"))

    #
    if (True):
        parentLogger = logging.getLogger("uvicorn.access")
        if (parentLogger):
            parentLogger.addHandler(handler)
        #
        parentLogger = logging.getLogger("uvicorn.error")
        if (parentLogger):
            parentLogger.addHandler(handler)
    #
    if (False):
        parentLogger = logging.getLogger("uvicorn")
        if (parentLogger):
            parentLogger.addHandler(handler)
# ---------------------------------------------------------------------------
            