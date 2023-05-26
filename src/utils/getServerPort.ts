const PORT_DEV = 5000;
export const PORT = process.env.NODE_ENV === 'dev' ? PORT_DEV : process.env.PORT;
