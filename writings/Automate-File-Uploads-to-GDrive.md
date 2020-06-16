---
title: "Automate File Uploads to Google Team Drives"
date: "2020-04-08"
author:
  twitter: "DylanAlbertazzi"
  name: "Dylan Albertazzi"
---

I did this for the Dynamic Robitics Lab earlier this year and think it's pretty useful. So I'm sharing how I did it with you guys.

Our lab needed to find a better way to collect robot log data. We used to have to walk over, pull out the USB drive with the data, and upload it onto our computer. The USB drive could have days of unorganized data to sift through which made it a pain to find the right file.

> So I used the Google Drive API to automate the process.

![](https://i.ibb.co/Lt1f5Rf/ezgif-com-crop-1.gif)

> Automatic upload in action.

---

## All right, let's get started

Let’s create a new project and enable the Google Drive API in the [Google Developer API console](https://console.developers.google.com/apis). For the sake of brevity we won’t explain the setup step by step however, there are many [tutorials](https://developers.google.com/drive/activity/v1/guides/project) out there that explain the project setup in more depth.

In the end it should look something like this. Where you can click on whatever you named your OAuth client and download a json file with your credentials.

![](https://i.ibb.co/4WpdF3d/Screen-Shot-2020-06-16-at-9-57-14-AM.png)

Now lets add our imports, we will be using [PyDrive](https://pypi.org/project/PyDrive/) to simplify the process.

```python
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
```

Next we need to make a connection to Google Drive. The function below assumes your credentials are stored in a file named “credentials.json”.

```python
def Google_login():
    g_login = GoogleAuth()
    # Try to load saved client credentials
    g_login.LoadCredentialsFile("credentials.json")

    if g_login.credentials is None:
        # Authenticate if they're not there
        g_login.LocalWebserverAuth()
    elif g_login.access_token_expired:
        # Refresh them if expired
        g_login.Refresh()
    else:
        # Initialize the saved creds
        g_login.Authorize()

    # Save the current credentials to a file
    g_login.SaveCredentialsFile("credentials.json")
    g_login.LocalWebserverAuth()
    drive = GoogleDrive(g_login)
    return drive
```

---

## Check if new folders need to be created

I used the file's name to determine where each file should go. A file name looked like this:

`2019-11-18_13:31_nodelta_neutral_StateEst_symmetry_speed0_3_freq1_2_muTor_0_001`

Each piece of the name helped determine which folders it should go into. We decided the most useful way to organize folders was by Date -> Policy name.

`_nodelta_neutral_StateEst_symmetry_speed0_3_freq1_2_muTor_0_001` is the policy name in the above string.

After the file name string was parsed the next step was to walk through the drive to see if there were already folders created for the file being uploaded. This function starts at a parent directory walks through the folders, looking for a the correct folder for the file. If it is found it will set the `doesExist` variable to `1`.

```python
######Check if year-mo-day folder exists --yes: move in --no: make it
def CreateFolders(tName): #input the name of the file you want to upload (tName)
    drive = Google_login() #login to google

    tNameOrig = tName
    date_pol_folder = ParseString(tName) #name of the folder we want to add our log file to
    parentFol = 'RL' #Name of our parent folder
    parent_folder_id = 'parent-folder-id'
    team_drive_id = 'team-drive-id'
    parent_list=[]
    date_pol_list=[]
    idList = [parent_folder_id] #Starts us in the DRL_Team-Drive/ RL folder in the shared team drive
    titleList = ['root', str(parentFol), str(date_pol_folder)]
    doesExist = 0
    full_List = [date_pol_list]
    i = 0

    #List the contents of the parent folder in Google Drive.
    full_List[0] = drive.ListFile({
    'q': "'%s' in parents and trashed=false" % idList[i],
    'corpora': 'teamDrive',
    'driveId': team_drive_id,
    'teamDriveId': team_drive_id,
    'includeTeamDriveItems': True,
    'includeItemsFromAllDrives': True,
    'supportsAllDrives': True,
    'supportsTeamDrives': True}).GetList()

    for f in full_List[0]: #list throught folders in parent directory

        ##See if a folder for the current date/policy exists
        if f['mimeType']=='application/vnd.google-apps.folder': # if folder
            if f['title'] == titleList[2]: #if folder were looking for
                print ('title: %s, id: %s' % (f['title'], f['id']))
                idList.append(f['id'])
                doesExist = 1
                i = i + 1
                break
```

---

## Upload to GDrive

The final step was to persist the changes by creating a folder if necessary and uploading the log file.

```python
 if doesExist == 1: #if the date/policy folder already exists, don't make a new one
        doesExist = 0
    else: #make a date/policy folder if one doesn't exist
        file1 = drive.CreateFile({
            'title': titleList[2],
            "mimeType": "application/vnd.google-apps.folder",
            'parents': [{
                'kind': 'drive#fileLink',
                'teamDriveId': team_drive_id,
                'id': idList[i] #parent folder (should be RL)
            }]
        })

        file1.Upload(param={'supportsTeamDrives': True}) #Upload new folder to GDrive

    UploadFile(tNameOrig, idList, drive) #upload the log file to the newly created date/policy folder
```

The code for the `UploadFile()` function is below 👇

```python
def UploadFile(tName, newIDS, drive):
    #This function uploads a file stored in directory 'tName' to a Google Drive folder with an id of 'newIDS'
    team_drive_id = 'team-drive-id'
    file1 = drive.CreateFile({
    'parents': [{
        'kind': 'drive#fileLink',
        'teamDriveId': team_drive_id,
        'id': newIDS[-1]
        }]
    })
# Create GoogleDriveFile instance
    file1.SetContentFile(tName) # Set content of the file from given string.
    file1.Upload(param={'supportsTeamDrives': True})

```

And that’s it. That's how to automatically upload files to Google Drive whenever you want🥳
