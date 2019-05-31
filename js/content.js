//attempting to make this all modular but failing miserably

/* *** Object Definition Starts *** */

//response object template
var resp = 
{
    todo: "", //action to be done 
    data: undefined //object to be sent
}

// Template for linkedin Profile
var templateIN = {
  name: "pv-top-card-section__name",
  url: "",
  location: "pv-top-card-section__location",
  image: "pv-top-card-section__photo",
//summary: "pv-top-card-section__summary-text", // reducing data overhead
  company: {
    name: "pv-top-card-v2-section__company-name",
  },
  current_education:
  {
    name: "pv-top-card-v2-section__school-name",
  },
  contact:
  {
    email: "pv-contact-info__header"
  }
//  resume: "pv-top-card-section__summary-treasury" // working on it
}

//job object
class Job {
  constructor() {
    this.company = "";
    this.location = [];
    this.doe = [];
    this.position = [];
    this.duration = [];
  }
}

//education object
class School {
  constructor(){
    this.institute = "";
    this.degree = "";
    this.field = "";
    this.cgpa = 0.0;
    this.duration = "";
    this.time = "";
    this.activities = "";
    this.summary = "";
  }
}


//methods to initialise the 
// Temporary pass object : mirrors the templateIN variable
// this object has functionalities to retrieve its data
var user = {
  name: "",
  url: "",
  location: "",
  image: undefined,
  company: {
    name: ""
  },
  current_education:
  {
    name: ""
  },
  contact:
  {
    email: ""
  },
  experience: [],
  education: [],
  init()
  {

  },
  //resume: ""
  getName: function()
  {
    if(document.getElementsByClassName(templateIN.name)[0])
    {
      this.name = document.getElementsByClassName(templateIN.name)[0].innerHTML;
    }else {this.name = ""}
  },
  getUrl: function()
  {
    this.url = location.href;
  },
  getLocation: function()
  {
    if(document.getElementsByClassName(templateIN.location)[0])
    {
      this.location = document.getElementsByClassName(templateIN.location)[0].textContent;
    } else { this.location = ""}
  },
  getImage: function()
  {
    if(document.getElementsByClassName(templateIN.image)[0])
    {
      user.image = document.getElementsByClassName(templateIN.image)[0].src;
    } else { user.image = "https://www.pinclipart.com/picdir/middle/8-82428_profile-clipart-generic-user-gender-neutral-head-icon.png";}
  },
  getCurrentCompany: function()
  {
    if(document.getElementsByClassName(templateIN.company.name)[0]) //current company if it exists
    {
      user.company.name = document.getElementsByClassName(templateIN.company.name)[0].textContent;
    } else {user.company.name = ""}
  },
  getLatestEducation: function()
  {
    if(document.getElementsByClassName(templateIN.current_education.name)[0]) //current or headlined educational institute if it exists
    {
    user.current_education.name = document.getElementsByClassName(templateIN.current_education.name)[0].textContent;
    } else { user.current_education.name = ""}
  },
  getEmail: function()
  {
    //finding mail
    if(document.getElementsByClassName(templateIN.contact.email))
    {
      var x = document.getElementsByClassName(templateIN.contact.email);

      //loop to find email
      var flag = 0;
      for(var i=0; i<x.length; i++)
      {
        if(x[i].textContent.trim().toLowerCase() == "email")
          {
            console.log(x[i].textContent.trim().toLowerCase());
            user.contact.email = x[i].nextElementSibling.textContent;
            flag = 1;
            break;
          }//condition to check email
      }
      if(flag == 0) user.contact.email = "";
    }//contact set email
  }, //getEmail method ends here

  getExperience: function() 
  //gets the experience array filling 
  //works perfectly unless linkedin loses its mind and changes their document format
   {
     user.experience = []; //flush out old values from array
     var exp = document.getElementsByClassName("experience-section")[0];
     //console.log(exp);
     if(exp != undefined || exp != null) // if experience header is there or not
     {
      var itr = exp.firstElementChild.nextElementSibling;
      var jobs = itr.childNodes;
     
      for(i=0; i<jobs.length; i++)
      {
        var temp = jobs[i];
        var job = new Job();
        if(temp.nodeName.toLowerCase() != "#text")
        {
          if(temp.nodeName.toLowerCase() == "li")
            temp = temp.firstElementChild; //leveling the tree structure

          var data_div = temp.firstElementChild.firstElementChild; //
          var ul_ver = data_div.nextElementSibling; //ul verifier
          if(ul_ver && ul_ver.nodeName.toLowerCase() == "ul")
          {
            data_div = data_div.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.lastElementChild;
            job.company = data_div.textContent.trim();

            var ul_list = ul_ver.childNodes;
            for(k=0; k<ul_list.length; k++)
            {
              var node = ul_list[k];
              if(node.nodeName.toLowerCase() == "li")
              {
                node = node.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild;
              
                /* don't try to make the below code lesser by
                  making subsequent variable dependent on previous one
                  keep them all dependent on 'node' variable.
                  similarly in the next else branching statement
                */
                var position = node.firstElementChild;
                var doe = node.firstElementChild.nextElementSibling.firstElementChild.lastElementChild;
                var duration = node.firstElementChild.nextElementSibling.lastElementChild.lastElementChild;
                var location = node.firstElementChild.nextElementSibling.nextElementSibling;

                if(position) job.position.push(position.lastElementChild.textContent.trim()); else job.position.push("");
                if(doe) job.doe.push(doe.textContent.trim()); else job.doe.push("");
                if(duration) job.duration.push(duration.textContent.trim()); else job.duration.push("");
                if(location) job.location.push(location.lastElementChild.textContent.trim()); else job.location.push("");
                this.experience.push(job);
              }
            }
          }
          /* the above and below branching statements of if-else
            look redundant in coding but they are not. totally different
            coding going on except extraction
          */
          else
          {
            data_div = data_div.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
            if(data_div) job.position.push(data_div.textContent.trim()); else job.position.push("");
            var companyName = data_div.nextElementSibling.lastElementChild; 
            var doe = data_div.nextElementSibling.nextElementSibling;
            var duration = data_div.nextElementSibling.nextElementSibling;
            var location = data_div.nextElementSibling.nextElementSibling.nextElementSibling;
            
            if(companyName) job.company = companyName.textContent.trim(); else job.company = "";
            if(doe) job.doe.push(doe.firstElementChild.lastElementChild.textContent.trim()); else job.doe.push("");
            if(duration) job.duration.push(duration.lastElementChild.lastElementChild.textContent.trim()); else job.duration.push("");
            if(location) job.location.push(location.lastElementChild.textContent.trim()); else job.location.push("");
            this.experience.push(job);
          }
        }// if condition to check if temp is #text
        
      } //for loop for iterating over the ul list
     }//if cond for exp != null
   },//getExperience method ends here

   getEducation: function()
   {
     user.education = [] //flush out old values from array

     if(document.getElementsByClassName("education-section")) //if education-section exists
     {
       var iterator = document.getElementsByClassName("education-section").firstElementChild.nextElementSibling;
       var nodes = iterator.childNodes;

       for(i=0; i<nodes.length; i++)
       {
        var school =  new School();
        var node = nodes[i];
        if(node.nodeName.toLowerCase() == "li")
        {
          node = node.firstElementChild.firstElementChild.firstElementChild; //the div right above above a & [div] elements
          var a = node.firstElementChild;
          var summary = node.firstElementChild.nextElementSibling;
          if(summary)
          {
            school.summary = summary.firstElementChild.textContent.trim();
          } else {school.summary = "";}
          if(a)
          {
            a = a.firstElementChild.nextElementSibling;
            var nameofinst = a.firstElementChild.firstElementChild;
            var degree = a.firstElementChild.firstElementChild.nextElementSibling.lastElementChild;
            var field = a.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild;
            var cgpa = a.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild;
            if(nameofinst) school.institute = nameofinst.textContent.trim(); else school.institute = "";
            if(degree) school.degree = degree.textContent.trim(); else school.degree = "";
            if(field) school.field = field.textContent.trim(); else school.field = "";
            if(cgpa) school.cgpa = cgpa.textContent.trim(); else school.cgpa = 0;

            a = a.firstElementChild.nextElementSibling;
            if(a)
            {
              var time = a.lastElementChild;
              if(time) school.duration = time.textContent.trim(); 
            } else school.duration = "";
            a = a.nextElementSibling;
            if(a)
            {
              var activities = a.lastElementChild;
              if(activities) school.activities = activities.textContent.trim();
            } else school.activities = "";
          }
          this.education.push(school);
        } //if the node is "li" or not
       }//for loop for iterating through the list of institutes
     }// if condn for education-section's existence
   }
}// userProfile mirror object ends here


/* ##### IFRAME IMPLEMENTATION ######### */
//calling our IframeFunction
var iframe = SetupIframe();
appendIframe(iframe);

//below are the functionalities for setting up our iframe
function SetupIframe()
{
  var iframe = document.createElement('iframe');
  createIframe(iframe, "./slider.html", "slidermenuiframe")
  styleIframe(iframe)
  return iframe
}

/* creation of iframe on the webpage */
function createIframe(iframe, src, id)
{
  iframe.id = id;
  iframe.src = chrome.extension.getURL(src);
  return iframe
}

//iframe styling function
function styleIframe(iframe)
{
  /*
    can be modified by actually passing the iframe_template object as an argument
    as well so as to pass on values into the styles.
    
    Or

    we can also use iframe.style.cssText but it is not stable for animations
  */

  // adding css style below with animation
  iframe.style.background = "#f7f7f7";
  iframe.style.height = "100%";
  iframe.style.width = "0px";
  iframe.style.position = "fixed";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.zIndex = "9000000000000000000";
  //iframe.style.boxShadow = "10px 10px 8px #888888";
  //iframe.style.borderLeft = "5px solid #becde5";
  iframe.frameBorder = "none"; 
  iframe.style.transition = "0.5s";
}

//iframe append to document
function appendIframe(iframe)
{
  document.body.appendChild(iframe); //append to the current website
}
/* *** End of Data Definition Part */

//listen for msg from event
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse)
{
  if(msg.todo == "auto_extraction_notbutton")
  {
     extraction(); //to add some spice
     window.addEventListener("scroll", extraction);
     //extraction function to extract the details from linkedin profile
  }
});


// extraction method
function extraction()
{
  user.getName();
  user.getUrl();
 // user.getSummary();
  user.getImage();
  user.getLocation();
  user.getCurrentCompany();
  user.getLatestEducation();
  user.getEmail();
  user.getExperience();
  resp.todo = "auto_extraction";
  resp.data = user;
  
  chrome.runtime.sendMessage(resp, function()
    {
      console.info("Auto extraction message sent!");
    });
}

//request accepted from events.js page to toggle the slider
  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse)
  {
    if(msg.todo == "toggle")
    {
      toggle();
    }
});


// nothing to bother about : just for testing purposes : run along
// just don't delete it
resp.todo = "showPageAction";
resp.data = undefined;
chrome.runtime.sendMessage(resp);

//toggle function invoked whenever extension icon clicked
function toggle()
{
    if(iframe.style.width == "0px")
    {
        iframe.style.width = "400px";
    } else {
        iframe.style.width = "0px";
    }
}


/* Residual code that might come handy in future
   is below:- 

/* template object for iframe
    can be employed for future use
var iframe_template = {
  src: "",
  id: "",
  background: "",
  height: "",
  width: "",
  position: "",
  top: "",
  right: "",
  zIndex: "",
  border: "",
  borderLeft: "",
  borderRight: "",
  frameBorder: "",
  transition: ""
  //add more styles if you want to
} 

//assign a temporary iframe variable
var iframe_temp = iframe_template;
*/

//string purify
function purifyString(string)
{
  string = string.replace("...", "");
  string = string.replace("See More", "");
  string = string.replace("see more", "");
  string = string.replace("See more", "");
  string = string.replace("  ", " ");
  string = string.replace("   ", " ");
  string = string.replace("    ", " ");
  string = string.replace("     ", " ");
  string = string.replace("      ", " ");
  string = string.trim();
  return string;
}