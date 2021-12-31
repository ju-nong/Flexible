window.onload = () => {
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const columnContains = document.getElementsByClassName("columnContain");

    main.addEventListener("dragover", e => {
        main.classList.add("active");
    })

    main.addEventListener("dragleave", e => {
        main.classList.remove("active");
    })

    header.addEventListener("drop", e => {
        console.log(1);
        e.preventDefault();

        main.classList.remove("active");

        addFiles(e.dataTransfer.files);
    })

    function addFiles(files){
        let isImg = true;	// 이미지파일인지 확인
        Array.from(files).forEach(file => {
            if(file.type.indexOf("image") < 0){	// 파일 타입이 이미지인지
                alert("이미지 파일을 업로드해주세요.");	// jpg, png. bmp, gif..
                isImg = false;	// 이미지파일이 아님
                return;
            }
        });
        
        if(isImg){	// 모두 이미지파일인 경우
            readImg(files);
        }
    }

    function readImg(files) {
        const fileArr = Array.from(files);
        
        fileArr.forEach((file, index) => {
            const reader = new FileReader();	// 파일리더 생성
            reader.readAsDataURL(file);
            
            const item = document.createElement("div");
            item.classList.add("item");

            const img = document.createElement("img");
            reader.onload = e => {  // 미리보기
                img.src = e.target.result;
            }

            const span = document.createElement("span");
            span.innerText = file.name;

            item.appendChild(img);
            item.appendChild(span);
            
            columnContains[getMinHeight()].appendChild(item);
        })
    }

    function getMinHeight(){
        let min = columnContains[0].clientHeight,
        index = 0;
        for(let i = 1; i < columnContains.length; i++){
            if(min > columnContains[i].clientHeight){
                min = columnContains[i].clientHeight;
                index = i;
            }
        }
        
        return index;
    }
}