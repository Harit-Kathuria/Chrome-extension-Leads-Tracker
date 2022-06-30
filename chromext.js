const btn = document.querySelector("#ipbtn")
const inputEl = document.getElementById("input-el")
let myLeads = []
const ulEl = document.getElementById("ulel")
const del_btn = document.getElementById("del")
const svtab = document.getElementById("tab-btn")

let leads = JSON.parse(localStorage.getItem("myLeads"))
if(leads!= null){
	myLeads = leads
	render(myLeads)
}

del_btn.addEventListener("dblclick",function(){
	localStorage.clear()
	myLeads = []
	render(myLeads)
})

btn.addEventListener("click",function(){
	myLeads.push(inputEl.value)
	inputEl.value = ""
	localStorage.setItem("myLeads",JSON.stringify(myLeads))
	render(myLeads)
})

svtab.addEventListener("click",function(){
	chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
		myLeads.push(tabs[0].url)
		localStorage.setItem("myLeads",JSON.stringify(myLeads))
		render(myLeads)
	})
})

function render(Leads){
	let listItems = ""
	for(let i=0;i<Leads.length;i++){
		//Template String
		listItems += `
			<li>
				<a target='_blank' href='${Leads[i]}'>${Leads[i]}</a>
			</li>`
	}
	ulEl.innerHTML = listItems
}