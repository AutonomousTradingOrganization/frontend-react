git add . && git commit -m"$1" && git push
bun run build && sed -i "s#/static#/frontend-react-build/static#g" build/index.html && rm -rf ../ato-frontend-react-build/* && cp -r build/* ../ato-frontend-react-build/ && cd ../ato-frontend-react-build && date > README.md && git add . && git commit -m"new deploy" && git push && cd -

