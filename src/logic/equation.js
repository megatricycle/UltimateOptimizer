export const extractArguments = (str) => {
    
}

export const parseFunction = (args, str) => {
    return eval('(' + args.join(',') + ') =>' + str);
}