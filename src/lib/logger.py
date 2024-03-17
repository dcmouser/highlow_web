# python modules
import time
import io


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
    # replacement for print function that will allow logging
    jrprint(*args, **kwargs)


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