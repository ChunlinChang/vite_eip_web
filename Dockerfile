# 1. 使用 Node.js 20 作為基礎映像
FROM node:20

# 2. 設定容器內的工作目錄
WORKDIR /app

# 3. 複製 package.json 和 package-lock.json（如果有）
COPY package.json package-lock.json ./

# 4. 安裝 npm 依賴
RUN npm install

# 5. 複製所有程式碼
COPY . .

# 6. 開放 5173 端口（Vite 預設使用 5173）
EXPOSE 5173

# 7. 啟動 Vite 應用
CMD ["npm", "run", "dev"]