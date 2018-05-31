function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Settings</Text>}>
        
        <Toggle settingsKey="weatherOn" label="Display Weather" selected />
        <Toggle settingsKey="activitiyOn" label="Display Activity" On />
        <Toggle settingsKey="heartRateOn" label="Display Heart Rate" On />
        <Toggle settingsKey="alwaysOn" label="Display Always On" On />
        
        <Select
          label={`Default Health Status`}  
          settingsKey="healthStatusDefault"
          disabled
          options={[
            {name:"Steps"},
            {name:"Calories"},
            {name:"Minutes"},
            {name:"Distance"},
            {name:"Elevation"},
            {name:"HeartRate"},
          ]} />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);