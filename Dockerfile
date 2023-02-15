FROM node:lts
#COPY package.json ./
COPY ./ ./
# RUN npm install --force --legacy-peer-deps
CMD ["npm", "run", "start"]