function openProductPage(product){
  productType = product;
  window.open("productPage.html");
  changeProduct(product);
}

var name;
var row;
function displayInfo(product){
  //alert("product: " + product);
  var productName = document.getElementById("productName");
  var productType = document.getElementById("productType");
  var price = document.getElementById("price");
  var adv = document.getElementById("advantages");
  var disadv = document.getElementById("disadvantages");
  var link = document.getElementById("link");
  db.collection(document.title).where('Product Name', '==', product).get().then((querysnapshot) =>{
    productName.innerHTML = querysnapshot.docs[0].get('Product Name');
    productType.innerHTML = querysnapshot.docs[0].get('Product Type');
    price.innerHTML = "$" + querysnapshot.docs[0].get('Price');
    adv.innerHTML = querysnapshot.docs[0].get('Advantages');
    disadv.innerHTML = querysnapshot.docs[0].get('Disadvantages');

    //link.innerHTML = querysnapshot.docs[0].get('Link');
    link.setAttribute("target", "_blank");
    link.setAttribute("href", querysnapshot.docs[0].get('Link'));

    var advStr = querysnapshot.docs[0].get('Advantages').split("; ");
    adv.innerHTML = "";
    for (var i = 0; i < advStr.length; i++){
      adv.innerHTML = adv.innerHTML + "<br>- " + advStr[i]
    }

    var disadvStr = querysnapshot.docs[0].get('Disadvantages').split("; ");
    disadv.innerHTML = "";
    for (var i = 0; i < disadvStr.length; i++){
      disadv.innerHTML = disadv.innerHTML + "<br>- " + disadvStr[i]
    }


  })
}

function loadTable(){
  //alert(document.title);
      var table = document.getElementById("productTable");
      db.collection(document.title).get().then((querysnapshot) =>{

            const docSnap = querysnapshot.docs;
            querysnapshot.docs.forEach(doc =>{
              //alert(doc.get('Product Name'));
              row = table.insertRow(0);
              var cell = row.insertCell(0);
              name = doc.get('Product Name');
              row.innerHTML = name;
              row.setAttribute("id", name);
              //alert(row.id);
              row.setAttribute("onClick", "displayInfo(this.id)");
            //  row.setAttribute("onClick", alertMe());
            })
            //document.getElementById("titleText").innerHTML = docSnap[0].get('title');

      })

}

var name1;
var row1;
function matchKeywords(){
  var keywords = document.getElementById("keywordInput").value.split(", ");
  alert(keywords.length);
  var table = document.getElementById("filteredTable");

  db.collection(document.title).get().then((querysnapshot) =>{

      querysnapshot.docs.forEach(doc =>{
        for (var i = 0; i < keywords.length; i++){
          if (doc.get("Keywords").includes(keywords[i])){
            row1 = table.insertRow(0);
            var cell = row1.insertCell(0);
            name1 = doc.get('Product Name');
            row1.innerHTML = name1;
            row1.setAttribute("id", name1);
            alert(row1.id);
            row1.setAttribute("onClick", "displayInfo(this.id)");
          }
        }

      })
  })
}