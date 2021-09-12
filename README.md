"# sample-react-native-app" 
#To run in complete local mode(local app + local server):
For server, map: ```adb reverse tcp:8080 tcp:8080```
```yarn android:dev```

#To run in partial mode(local app + remote server):
```yarn android:staging```

#To run in production mode
```yarn android:production```